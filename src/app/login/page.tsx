'use client';

import { Button, Form, FormProps, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { useFormRequest } from '../../lib/hooks/useFormRequest';
import { useRequest } from '../../lib/hooks/useRequest';
import { useAuthStore } from '../../lib/store/store';

type FieldType = {
  username?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { run, submitting, submit } = useFormRequest();
  const { request } = useRequest();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await run(async () => {
      const [res, error] = await submit('/login', values);
      if (error) return;
      useAuthStore.getState().updateTokens(res.accessToken, res.refreshToken);
      const user = await request({ url: 'users/me', method: 'get' });
      useAuthStore.getState().setAuth({ user: user });
      router.push('/');
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold">后台管理系统登录</h1>

        <Form name="login-form" autoComplete="off" onFinish={onFinish}>
          <Form.Item<FieldType>
            className="mb-4"
            name="username"
            hasFeedback
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 5, message: '用户名长度不能小于5' },
            ]}
          >
            <Input size="large" prefix={<AiOutlineUser />} placeholder="用户名" />
          </Form.Item>
          <Form.Item<FieldType>
            className="mb-6"
            name="password"
            hasFeedback
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度不能小于6' },
            ]}
          >
            <Input.Password size="large" prefix={<AiOutlineLock />} placeholder="密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={submitting}>
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
}
