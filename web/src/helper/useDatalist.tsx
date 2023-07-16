import { useListRequest } from '@web/api';
import { Empty, Result } from 'antd';
import { Loading } from '../components/loading';

export default (
  requestList: (params: Partial<Record<string, number | string>>) => Promise<{
    total: number;
    list: any[];
  }>,
  transition: (list: any[]) => React.ReactNode,
) => {
  const { error, loading, result, setParams } = useListRequest(requestList);
  return [
    setParams,
    result.total,
    <div>
      {error && (
        <Result status="warning" title="Request error" subTitle={error} />
      )}
      {loading && <Loading></Loading>}
      {!error && !loading && result.list.length === 0 && <Empty />}
      {!error && !loading && result.list.length && transition(result.list)}
    </div>,
  ] as const;
};
