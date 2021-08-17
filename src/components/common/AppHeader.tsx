import React, { FC } from 'react';
import {
  Link
} from "react-router-dom";

import { Layout, Menu, Avatar } from 'antd';

import { HomeOutlined, GiftOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

import './AppHeader.scss';
import { useAppSelector } from '../../app/hooks';
import { selectUID, selectUserPhoto } from '../../features/user/userSlice';

const { Header } = Layout;

const AppHeader: FC = () => {
  const isLoggedIn: boolean = !!useAppSelector(selectUID);
  const userPhoto: string | null | undefined = useAppSelector(selectUserPhoto);

  return (
    <Header className="header">
      <h1 className="header__logo">Wishlist</h1>
      {isLoggedIn && <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
      >
        <Menu.Item key='dashboard'>
          <Link to="/"><HomeOutlined /> Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='wishlist'>
          <Link to="/wishlist"><UnorderedListOutlined /> My Wishlist</Link>
        </Menu.Item>
        <Menu.Item key='wishes-i-fulfill'>
          <Link to="/wishes-i-fulfill"><GiftOutlined /> Wishes I fulfill</Link>
        </Menu.Item>
        <Menu.Item className="header__profile-link" key='profile'><Link to="/profile">{
          userPhoto ?
            <Avatar src={userPhoto} /> :
            <Avatar icon={<UserOutlined />} />
        } Profile</Link></Menu.Item>
      </Menu>}
    </Header>
  );
}

export default AppHeader;
