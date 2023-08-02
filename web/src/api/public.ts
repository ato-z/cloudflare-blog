import { isResponseError } from '@web/helper/assert';
import { useEffect, useState } from 'react';
export { imageUplaod } from '@web/helper/codeImageFile';

/**
 * 请求列表
 */
export const useListRequest = <R>(
  requestList: (parmas: Record<string, string | number>) => Promise<any>,
) => {
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ total: number; list: R[] }>({
    total: 0,
    list: [],
  });
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<Record<string, string | number>>({});

  useEffect(() => {
    setLoading(true);

    requestList(params)
      .then(setResult)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else if (isResponseError(err)) {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [params, setLoading]);

  return {
    loading,
    setParams,
    result,
    error,
  };
};
