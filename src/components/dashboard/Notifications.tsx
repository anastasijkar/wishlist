import React, { FC } from 'react';

import { useAppSelector } from '../../app/hooks';

import { selectNotifications, selectNotificationsErrorState, selectNotificationsLoadingState } from '../../features/notifications/notificationsSlice';
import INotification from '../../interfaces/notification.interface';

import { grey } from '@ant-design/colors';
import { LoadingOutlined } from '@ant-design/icons';
import { Badge, Card } from 'antd';

import formatDistance from 'date-fns/formatDistance'

import './Notifications.scss'

const Notifications: FC = () => {
  const notificationsError: boolean = useAppSelector(selectNotificationsErrorState);
  const notificationsLoading: boolean = useAppSelector(selectNotificationsLoadingState);
  const notifications: INotification[] = useAppSelector(selectNotifications);

  const notificationsList = notifications.length ? notifications.map((notification: INotification) => {
    return (
      notification.time
        ?
        <Badge.Ribbon key={notification.id} text={formatDistance(notification.time, new Date(), { addSuffix: true, includeSeconds: true })} color={grey[2]}>
          <Card className="notification">{notification.text}</Card>
        </Badge.Ribbon>
        :
        <Card key={notification.id} className="notification">{notification.text}</Card>
    )
  }) : <p>Nothing is there</p>;

  const content = notificationsLoading ? <LoadingOutlined /> : (notificationsError ? <p>Error while loading!</p> : notificationsList);

  return <div>
    {content}
  </div>;
}

export default Notifications;
