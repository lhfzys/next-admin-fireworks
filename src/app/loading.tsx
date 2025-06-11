'use client';

import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="flex min-h-60 items-center justify-center">
      <Spin />
    </div>
  );
}
