import React, { FC, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import firebase from './firebase';

import AppHeader from './components/common/AppHeader';
import Dashboard from './routes/Dashboard';
import WishList from './routes/wishlist';
import AddWish from './routes/wishlist/add';
import WishesIFulfill from './routes/WishesIFulfill';
import Login from './routes/Login';
import Profile from './routes/Profile'

import { useAppDispatch } from './app/hooks';
import { fetchNotitications } from './features/notifications/notificationsSlice';
import { fetchUser, setUID } from './features/user/userSlice';

import { Layout, /*Breadcrumb*/ } from 'antd';

import './App.scss';

const { Content, Footer } = Layout;

const App: FC = () => {
  const dispatch = useAppDispatch();

  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged: ', user)
      if (user) {
        dispatch(setUID(user.uid))
        dispatch(fetchUser(user))
        dispatch(fetchNotitications(user.uid));
      } else {
        setRedirectToLogin(true);
      }
    });
  }, [dispatch])

  return (
    <div className="App">
      <Layout className="layout">
        <Router>
          {redirectToLogin && <Redirect to="/login"></Redirect>}
          <AppHeader />
          <Content style={{ padding: '0 50px' }}>
            {/*<Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Breadcrumb>*/}
            <div className="site-layout-content">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/wishlist/:uid?" component={WishList} />
                <Route path="/wish/add" component={AddWish} />
                <Route path="/wishes-i-fulfill" component={WishesIFulfill} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Wishlist ©2021 Created by Anastasiia Rudych</Footer>
        </Router>
      </Layout>
    </div >
  );
}

export default App;
