'use client';

import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Skeleton } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useMenus } from '../../hooks/useMenus';
import { useAuthStore } from '../../store/store';
import { IconMapper } from '../../utils/icon-mapper';
import { PageAnimatePresence } from '../page-animate-presence';
import Footer from './footer';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const user = useAuthStore((state: any) => state.user);
  const { menus, loading } = useMenus();

  if (loading) return <Skeleton active />;
  const loopMenuItem = (menus: any[]): MenuDataItem[] =>
    menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMapper[icon as 'smile'],
      children: children && loopMenuItem(children),
    }));
  const menuItemRender = (item: any, dom: any) => <Link href={item.path}>{dom}</Link>;

  return (
    <ProLayout
      title="拾趣星球"
      layout="mix"
      contentWidth="Fluid"
      siderWidth={208}
      fixSiderbar
      fixedHeader
      siderMenuType="sub"
      logo={false}
      className="min-h-screen"
      avatarProps={{
        src: 'https://i.pravatar.cc/300',
        title: `${user?.userName || '未知用户'}`,
      }}
      menu={{
        locale: false,
        request: async () => loopMenuItem(menus),
      }}
      menuItemRender={menuItemRender}
      selectedKeys={[pathname]}
      footerRender={() => <Footer />}
    >
      <PageAnimatePresence>{children}</PageAnimatePresence>
    </ProLayout>
  );
};
