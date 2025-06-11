'use client';
import { MainLayout } from '../../lib/components/layouts/main-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
