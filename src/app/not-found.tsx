'use client';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，该页面不存在。"
      extra={
        <Button
          type="primary"
          onClick={() => {
            router.replace('/');
          }}
        >
          返回首页
        </Button>
      }
    />
  );
}
