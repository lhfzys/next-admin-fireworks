'use client';

import { ActionType, PageContainer, ParamsType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { useRequest } from '../../../lib/hooks/useRequest';

export default function UserPage() {
  const actionRef = useRef<ActionType>(null);
  const columns: ProColumns[] = [
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '操作',
      key: 'option',
      width: 160,
      valueType: 'option',
      render: (text, record, _, action) => {
        if (record.id !== 1) {
          return [
            <a
              type="link"
              key="link"
              onClick={() => {
                action?.startEditable?.(Number(record.id));
              }}
            >
              编辑
            </a>,
          ];
        }
      },
    },
  ];
  const { request: fetchUserList, loading } = useRequest();
  const getUserList = async (params: ParamsType) => {
    const { current, pageSize, userName } = params;
    console.log(userName);
    const response = await fetchUserList({
      method: 'get',
      url: '/users',
      params: {
        userName: userName,
        pageNumber: current,
        pageSize: pageSize,
      },
    });
    if (response) {
      return { data: response?.items, success: true, total: response?.totalItems };
    }
    return { data: [], success: false };
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <ProTable
        rowKey="id"
        actionRef={actionRef}
        scroll={{ x: 'max-content' }}
        columns={columns}
        request={getUserList}
        cardBordered
        rowHoverable
        loading={loading}
      />
    </PageContainer>
  );
}
