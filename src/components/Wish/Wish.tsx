import React, { FC, useState, useCallback } from 'react';
import PropTypes from 'prop-types'

import { FirebaseTimestamp } from '../../firebase';
import { firebaseTimestampToDate } from '../../utils/firebaseTimestamp';

import { Card, Avatar, Popover, Button, Skeleton, Tag } from 'antd';
import { EditOutlined, EllipsisOutlined, ShareAltOutlined, UserAddOutlined, DeleteOutlined, FileZipOutlined, HeartOutlined, HeartTwoTone } from '@ant-design/icons';

import './Wish.scss'

const { Meta } = Card;

const propTypes = {
  isOwn: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  avatarUrl: PropTypes.string,
  isFavorite: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
  dueDate: PropTypes.instanceOf(FirebaseTimestamp)
};

type WishProps = PropTypes.InferProps<typeof propTypes>;

const Wish: FC<WishProps> = ({ title, description, image, avatarUrl, isOwn, isFavorite, tags, dueDate }) => {

  // TO FIX: add/update data from store
  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  const toggleFavorite = useCallback(() => {
    setLocalFavorite(!localFavorite);
  }, [localFavorite])

  const moreActions = [
    <Button icon={<DeleteOutlined />} type="link" block key="delete">
      <span>Delete</span>
    </Button>,
    <Button icon={<FileZipOutlined />} type="link" block key="archive">
      <span>Archive</span>
    </Button>
  ]

  const favoriteButton = localFavorite ? <HeartTwoTone twoToneColor="#ff7875" onClick={toggleFavorite} key="favorite" /> : <HeartOutlined onClick={toggleFavorite} key="favorite" />;

  const tagsList = tags ? tags.map((tag: string | null | undefined, index: number) => tag ? <Tag key={index}>{tag}</Tag> : '') : '';

  const isExpired: boolean = !!(dueDate && firebaseTimestampToDate(dueDate) < new Date());

  const actions = [
    <ShareAltOutlined key="share" />,
    isOwn ? <EditOutlined key="edit" /> : <UserAddOutlined key="take" />,
    isOwn ? <Popover key="more" placement="topRight" content={moreActions} trigger="click" overlayInnerStyle={{
      padding: 0
    }}>
      <EllipsisOutlined />
    </Popover> : favoriteButton
  ]

  const avatar = isOwn ? undefined : avatarUrl ? <Avatar src={avatarUrl} /> : <Skeleton.Avatar />;

  return (
    <Card
      className="wish"
      style={{ width: 300, opacity: isExpired ? 0.5 : 1 }}
      cover={image ?
        <img
          alt={title}
          src={image}
        /> : <Skeleton.Image className="wish__img-placeholder" />
      }
      actions={actions}
    >
      <Meta
        avatar={avatar}
        title={title}
        description={description}
        style={{ marginBottom: '15px' }}
      />
      {tagsList}
    </Card>
  );
}

Wish.propTypes = propTypes;

Wish.defaultProps = {
  isOwn: false,
  description: '',
  image: '',
  avatarUrl: '',
  isFavorite: false,
  tags: [],
  dueDate: null
}

export default Wish;
