import { App } from 'antd';
import { useCallback, useState } from 'react';
import { apiClient } from '../utils/request';

export function useFormRequest<T = any>() {
  const { message } = App.useApp();
  const [submitting, setSubmitting] = useState(false);

  const run = useCallback(async <T>(fn: () => Promise<T>) => {
    setSubmitting(true);
    try {
      return await fn();
    } finally {
      setSubmitting(false);
    }
  }, []);

  const submit = useCallback(
    async (url: string, data: any): Promise<[T | null, any]> => {
      setSubmitting(true);
      try {
        const response: any = await apiClient.post(url, data);
        if (response.status === 'Ok') {
          message.success('操作成功');
          return [response.value, null];
        }

        if (response.validationErrors) {
          const firstKey = Object.keys(response.validationErrors)[0];
          const firstMsg = response.validationErrors[firstKey][0];
          message.error(firstMsg);
        } else if (response.errors?.length) {
          message.error(response.errors[0]);
        } else {
          message.error('请求失败');
        }
        return [null, response];
      } catch (err) {
        message.error('服务器错误');
        return [null, err];
      } finally {
        setSubmitting(false);
      }
    },
    [message],
  );
  return { run, submitting, submit };
}
