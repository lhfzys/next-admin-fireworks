'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuthStore } from '../store/store';

interface AuthGuardProps {
  children: React.ReactNode;
  whiteList?: string[];
}

export const AuthGuard = ({ children, whiteList = ['/login'] }: AuthGuardProps) => {
  const auth = useAuthStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!auth.isHydrated) return;
    if (!auth.isLogin && !whiteList.includes(pathname)) {
      router.replace('/login');
    }
  }, [auth.isHydrated, auth.isLogin, pathname, router, whiteList]);
  if (!auth.isLogin && !whiteList.includes(pathname)) return null;
  return <>{children}</>;
};
