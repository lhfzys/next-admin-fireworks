import { message, Modal } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import { useAuthStore } from '../store/store';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 6000,
});

apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('auth-storage');
    const accessToken = user ? `${JSON.parse(user).state.accessToken}` : undefined;
    if (accessToken && !config.headers?.Authorization) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  () => {
    message.error('发起请求出错');
    throw new Error('发起请求出错');
  },
);
apiClient.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 422) {
      message.error(error.response.data.message);
      return;
    }
    if (error.response.status === 429) {
      const retryAfter = error.response.headers['Retry-After'];
      if (retryAfter) {
        message.warning(`您发送的请求过多，请等待${retryAfter}秒后重试。`);
        return;
      } else {
        message.warning(`您发送的请求过多，请稍后重试。`);
        return;
      }
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const user = localStorage.getItem('auth-storage');
        const refreshToken = user ? `${JSON.parse(user).state.refreshToken}` : undefined;
        if (!refreshToken) {
          clearAuthAndRedirect();
          return;
        }
        const { value }: any = await request({
          url: 'login/refresh-token',
          method: 'POST',
          data: { token: refreshToken },
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        console.log('refresh token', value);
        if (!value) {
          clearAuthAndRedirect();
          return;
        }
        useAuthStore.getState().updateTokens(value.accessToken, value.refreshToken);
        originalRequest.headers['Authorization'] = `Bearer ${value.accessToken}`;
        return apiClient(originalRequest);
      } catch (error: any) {
        if (error.response.status === 401) {
          clearAuthAndRedirect();
        }
        return Promise.reject(error);
      }
    }
    console.log(error);
    return Promise.reject(error);
  },
);
function clearAuthAndRedirect() {
  localStorage.clear();
  Modal.confirm({
    title: '登录状态已失效',
    okText: '重新登录',
    closable: false,
    onOk: () => {
      window.location.replace('/login');
    },
  });
}
function filterGetRequestParams(config: AxiosRequestConfig): AxiosRequestConfig {
  if (!config.params) {
    return config;
  }
  const filteredParams = _.pickBy(config.params, (value) => value !== '' && value !== undefined);
  return { ...config, params: filteredParams };
}

async function request(config: AxiosRequestConfig) {
  return await apiClient.request(filterGetRequestParams(config));
}

export function get(url: string, params?: any) {
  return request({ url, method: 'GET', params });
}

export function post(url: string, data?: any) {
  return request({ url, method: 'POST', data });
}
export function put(url: string, data?: any) {
  return request({ url, method: 'PUT', data });
}
export function patch(url: string, data?: any) {
  return request({ url, method: 'PATCH', data });
}
export { request };
