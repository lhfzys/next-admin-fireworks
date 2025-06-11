'use client';

import { ProLayout } from '@ant-design/pro-components';
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/store';
import { PageAnimatePresence } from '../page-animate-presence';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const user = useAuthStore((state: any) => state.user);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  return (
    <div className="min-h-screen">
      {isMounted ? (
        <ProLayout
          token={{
            sider: {
              colorMenuBackground: '#fff',
              colorMenuItemDivider: '#dfdfdf',
              colorTextMenu: '#595959',
              colorTextMenuSelected: 'rgba(42,122,251,1)',
              colorBgMenuItemSelected: 'rgba(230,243,254,1)',
            },
          }}
          title="拾趣星球"
          layout="mix"
          contentWidth="Fluid"
          siderWidth={208}
          fixSiderbar
          fixedHeader
          siderMenuType="sub"
          avatarProps={{
            src: 'https://i.pravatar.cc/300',
            title: `${user?.userName || '未知用户'}`,
            icon: '',
          }}
        >
          <PageAnimatePresence>{children}</PageAnimatePresence>
        </ProLayout>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};
