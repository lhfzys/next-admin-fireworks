import { App } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import { apiClient } from '../utils/request';

interface ResultResponse<T> {
  status: 'Ok' | 'Invalid' | 'Error';
  value: T;
  errors: string[];
  validationErrors?: Record<string, string[]>;
}

export function useRequest<T = any>() {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  const request = useCallback(
    async (config: AxiosRequestConfig) => {
      setLoading(true);
      setError(null);
      try {
        const response: ResultResponse<T> = await apiClient.request(config);
        if (response.status === 'Ok') {
          setData(response.value);
          return response.value;
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

        setError(response);
        return Promise.reject(response);
      } catch (err) {
        message.error('网络错误或服务器异常');
        setError(err);
        return Promise.reject(err);
      } finally {
        setLoading(false);
      }
    },
    [message],
  );
  return { loading, data, error, request };
}
