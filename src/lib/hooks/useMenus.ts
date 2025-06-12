import { MenuDataItem } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/store';
import { apiClient } from '../utils/request';

export function useMenus() {
  const [menus, setMenus] = useState<MenuDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cachedMenu = useAuthStore.getState().menu;

  useEffect(() => {
    if (cachedMenu) {
      setMenus(cachedMenu);
      setLoading(false);
      return;
    }
    apiClient
      .get('/users/menu')
      .then((res: any) => {
        setMenus(transformMenus(res.value || []));
        // console.log(transformMenus(res.value || []));
        useAuthStore.getState().setMenu(transformMenus(res.value || []));
      })
      .catch((err) => {
        console.error('菜单加载失败', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cachedMenu]);

  return { menus, loading, error };
}
function transformMenus(menus: any[]): MenuDataItem[] {
  return menus.map(({ icon, children, ...item }) => ({
    ...item,
    name: item.name,
    path: item.url,
    icon,
    children: Array.isArray(children) ? transformMenus(children) : [],
  }));
}
