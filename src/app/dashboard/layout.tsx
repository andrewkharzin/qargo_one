import { ReactNode } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}