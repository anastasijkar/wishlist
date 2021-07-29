import React, { FC, useState, useCallback } from 'react';
import PropTypes from 'prop-types'

import { Card, Avatar, Popover, Button, Skeleton } from 'antd';
import { EditOutlined, EllipsisOutlined, ShareAltOutlined, UserAddOutlined, DeleteOutlined, FileZipOutlined, HeartOutlined, HeartTwoTone } from '@ant-design/icons';

import './Wish.scss'

const { Meta } = Card;

const propTypes = {
  isOwn: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  avatarUrl: PropTypes.string,
  isFavorite: PropTypes.bool
};

type WishProps = PropTypes.InferProps<typeof propTypes>;

const Wish: FC<WishProps> = ({ title, description, image, avatarUrl, isOwn, isFavorite }) => {

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

  const actions = [
    <ShareAltOutlined key="share" />,
    isOwn ? <EditOutlined key="edit" /> : <UserAddOutlined key="take" />,
    isOwn ? <Popover key="more" placement="topRight" content={moreActions} trigger="click" overlayInnerStyle={{
      padding: 0
    }}>
      <EllipsisOutlined />
    </Popover> : favoriteButton
  ]

  const avatar = avatarUrl ? <Avatar src={avatarUrl} /> : <Skeleton.Avatar />;

  return (
    <Card
      className="wish"
      style={{ width: 300 }}
      cover={image ?
        <img
          alt={title}
          src={image}
        /> : <Skeleton.Image className="wish__img-placeholder" />
      }
      actions={actions}
    >
      <Meta
        avatar={isOwn && avatar}
        title={title}
        description={description}
      />
    </Card>
  );
}

Wish.propTypes = propTypes;

Wish.defaultProps = {
  isOwn: false,
  description: '',
  image: '',
  avatarUrl: '',
  isFavorite: false
}

export default Wish;
