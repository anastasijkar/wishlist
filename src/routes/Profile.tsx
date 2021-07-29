import React, { FC, useState } from 'react';
import { Redirect } from "react-router-dom";

import { Space, Button } from 'antd';

import { logOut } from '../utils/loginHelper';

import { useAppDispatch } from '../app/hooks';
import { clearUser } from '../features/user/userSlice';

const Profile: FC = () => {
  const dispatch = useAppDispatch();

  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  const logUserOut = () => {
    logOut(() => {
      dispatch(clearUser());
      setRedirectToLogin(true);
    })
  }
  return (
    redirectToLogin ? <Redirect to="/login"></Redirect> :
      <div className="profile">
        <Space align="center" className="fill justify-center">
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={logUserOut}
          >
            Log Out
            </Button>
        </Space>
      </div>
  );
}

export default Profile;
