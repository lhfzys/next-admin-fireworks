'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { App as AntdApp, ConfigProvider } from 'antd';
import React from 'react';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#722ed1' },
      }}
    >
      <AntdRegistry>
        <AntdApp>{children}</AntdApp>
      </AntdRegistry>
    </ConfigProvider>
  );
};

export default RootProvider;
