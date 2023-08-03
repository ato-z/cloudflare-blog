import { useListRequest } from '@web/api';
import { Empty, Result } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { Loading } from '../components/loading';
import { useEffect, useState } from 'react';

type TableListProp = {
  columns: ColumnsType<any>;
  request: (op: any) => Promise<{ total: number; list: Array<any> }>;
  pageSize: number;
};
export const useTableList = ({ columns, request, pageSize }: TableListProp) => {
  const [currentPage, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const { error, loading, result, setParams } = useListRequest(request);

  // 统计页数
  useEffect(() => {
    if (total === 0 && !loading) {
      setTotal(result.total);
    }
  }, [result, loading, setTotal]);

  return [
    (param: Record<string, string | number>) => {
      const end = Math.max(currentPage * pageSize, pageSize);
      const start = end - pageSize;
      return setParams(_ => ({ ..._, end, start, ...param }));
    },
    <>
      {error && (
        <Result status="warning" title="Request error" subTitle={error} />
      )}
      {loading && <Loading></Loading>}
      {!error && !loading && result.list.length === 0 && (
        <Empty style={{ marginTop: '100px' }} />
      )}
      {!error && !loading && result.list.length ? (
        <Table
          rowKey={'id'}
          columns={columns}
          dataSource={result.list}
          pagination={{ total, onChange: page => setPage(page) }}
        />
      ) : (
        ''
      )}
    </>,
  ] as const;
};
