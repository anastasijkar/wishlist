import React, { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import randomEmoji from '../utils/randomEmoji';

import { selectUserName } from '../features/user/userSlice';

import { Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Notifications from '../components/dashboard/Notifications';

const { Title } = Typography;

const Dashboard = () => {
  const username: string | null = useAppSelector(selectUserName);

  const emoji: string = useMemo(() => randomEmoji(), []);

  return (
    username
      ? <div className="dashboard">
        <Title level={3}>Hello there, <em>{username}</em>! {emoji}</Title>
        <Notifications />
      </div>
      : <LoadingOutlined />
  );
}

export default Dashboard;
