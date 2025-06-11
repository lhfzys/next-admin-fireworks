'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { AuthGuard } from '../lib/components/auth-guard';
import { MainLayout } from '../lib/components/layouts/main-layout';

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  if (isLoginPage) return <>{children}</>;

  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
};
