import React, { FC, useState, useCallback } from 'react';
import { Redirect } from "react-router-dom";

import { Space, Button } from 'antd';

import { GoogleOutlined } from '@ant-design/icons';

import { logIn } from '../utils/loginHelper';

const Login: FC = () => {

  const [redirectToHome, setRedirectToHome] = useState<boolean>(false);

  const logInWithGoogle = useCallback(() => {
    logIn(() => {
      setRedirectToHome(true);
    })
  }, []);

  return (
    redirectToHome
      ? <Redirect to="/" />
      : <div className="login">
        <Space align="center" className="fill justify-center">
          <Button
            type="primary"
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            onClick={logInWithGoogle}
          >
            Log In
            </Button>
        </Space>
      </div>
  );
}

export default Login;
