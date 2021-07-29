import React, { FC, useState } from 'react';
import { Redirect } from "react-router-dom";

import { Form, Input, Button, Space, Typography, Select, DatePicker, Radio, RadioChangeEvent } from 'antd';
import { MinusCircleOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'

import { addWish } from '../../features/wishlist/wishlistAPI';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUID } from '../../features/user/userSlice';

import SURPRISE_SETTINGS from '../../enums/surpriseSettings.enum';
import WISH_STATUSES from '../../enums/wishStatuses.enum';

import WishGenerator from '../../utils/wish.generator';
import formatFirebaseTimestamp from '../../utils/firebaseTimestamp';

import IWish from '../../interfaces/wish.interface';

import './add.scss';

const { Title } = Typography;

const AddWish: FC = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const [ssHint, setSsHint] = useState<string>('');
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [redirectToWishlist, setRedirectToWishlist] = useState<boolean>(false);

  const surpriseOptions = [{
    key: SURPRISE_SETTINGS.VISIBLE,
    title: 'Visible (default)',
    hint: 'You will be always able to see what actions were made to your wish and by whom.'
  }, {
    key: SURPRISE_SETTINGS.SURPRISE,
    title: 'Surprise',
    hint: 'You will be able to see the status of your wish - is it taken by somebody or not, but the their identity will be kept in secret'
  }, {
    key: SURPRISE_SETTINGS.TOTAL_SURPRISE,
    title: 'Total Surprise!',
    hint: 'You just create a wish... And you have no more power here! >:) All the actions performed on the wish are unvisible to you. You can still delete or archive it (at your own risk...)'
  }];

  const onSurpriseSettingChange = (e: RadioChangeEvent) => {
    setSsHint(surpriseOptions.find(option => option.key === e.target.value)?.hint || '');
  }

  const uid = useAppSelector(selectUID);

  const surpriseRadioButtons = surpriseOptions.map((option) => <Radio.Button key={option.key} value={option.key}>{option.title}</Radio.Button>)

  const onFinish = async (values: any) => {
    if (uid) {
      setAddLoading(true);
      console.log('Success:', values);

      const wishToAdd: IWish = new WishGenerator(null, {
        title: values.title,
        description: values.description,
        images: values.images && values.images.length ? values.images.filter((image: string) => !!image) : null,
        tags: values.tags,
        dueDate: values.dueDate ? formatFirebaseTimestamp(values.dueDate.toDate()) : null,
        taken: false,
        status: WISH_STATUSES.AVAILABLE,
        surpriseSetting: values.surpriseSetting,
        takenByIds: null,
        takeTogetherRequest: null,
      }).returnWish();

      await addWish(uid, wishToAdd);
      setAddLoading(false);
      setRedirectToWishlist(true);
    }
  };

  return (
    redirectToWishlist
      ? <Redirect to="/wishlist" />
      : <Space direction="vertical" className="wish-form fill">
        <Title level={3}>Add a new Wish</Title>
        <Form
          name="wish-form"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          labelAlign='left'
          initialValues={{}}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.List name="images">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <div className="wish-form__image-url-container" key={key}>
                    <Form.Item
                      {...restField}
                      name={[name]}
                      fieldKey={[fieldKey]}
                      label={`Image #${index + 1} URL`}
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 19 }}
                      style={{ display: 'flex', width: '100%' }}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add image
              </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            label="Due date"
            name="dueDate"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tags"
          >
            <Select
              mode="tags"
              placeholder="Add your tags"
              style={{ width: '100%' }}
            >
              <Select.Option key="birthday" value="birthday">birthday</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Surprise setting"
            name="surpriseSetting"
            extra={ssHint}
            rules={[{ required: true, message: 'Surprise setting is required' }]}
          >
            <Radio.Group onChange={onSurpriseSettingChange}>
              {surpriseRadioButtons}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 20, span: 4 }}
            style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={addLoading}
              icon={addLoading ? <LoadingOutlined /> : undefined}
            >
              Submit
        </Button>
          </Form.Item>
        </Form>
      </Space>
  );
}

export default AddWish;
