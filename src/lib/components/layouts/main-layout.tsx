'use client';

import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Skeleton } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/store';
import { IconMapper } from '../../utils/icon-mapper';
import { apiClient } from '../../utils/request';
import { PageAnimatePresence } from '../page-animate-presence';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/']);
  const user = useAuthStore((state: any) => state.user);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const menuItemRender = (item: any, dom: any) => (
    <Link
      key={item.id}
      href={item.url}
      onClick={() => {
        setSelectedKeys([item.path || '/']);
      }}
    >
      {dom}
    </Link>
  );

  const loopMenuItem = (menus: any[]): MenuDataItem[] =>
    menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMapper[icon as 'smile'],
      children: children && loopMenuItem(children),
    }));

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
          menu={{
            locale: false,
            request: async () => {
              const res: { value: any } = await apiClient.get('users/menu');
              console.log(res.value);
              return loopMenuItem(res?.value);
            },
          }}
          menuItemRender={menuItemRender}
          selectedKeys={selectedKeys}
        >
          <PageAnimatePresence>{children}</PageAnimatePresence>
        </ProLayout>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};
