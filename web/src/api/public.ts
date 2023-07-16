import { isResponseError } from '@web/helper/assert';
import { request } from '@web/helper/axios';
import { getBase64, getImageData } from '@web/helper/codeImageFile';
import { useEffect, useState } from 'react';

/**
 * 上传图片
 */
const checkImgFile = (file: File, maxM: number = 2) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    throw new Response('You can only upload JPG/PNG file!', { status: 400 });
  }

  const isLtKM = file.size / 1024 / 1024 < maxM;
  if (!isLtKM) {
    throw new Response(`Image must smaller than ${maxM}MB!`, { status: 400 });
  }
};
export const imageUplaod = async (file: File, maxM: number = 2) => {
  /** 校验文件合法性 */
  checkImgFile(file, maxM);

  /** 创建image元素并处理 */
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = await getBase64(file);

  await new Promise(resolve => (img.onload = resolve));

  const data = await getImageData(img);

  /** 转formData上传 */
  const url = 'upload/v1/img/base64';
  const formData = new FormData();
  const keys = Object.keys(data) as Array<keyof typeof data & string>;
  keys.forEach(key => {
    if (data[key]) {
      formData.append(key, <string>data[key]);
    }
  });
  formData.append('img', img.src);

  return request<{ id: number; path: string }>({
    url,
    method: 'post',
    data: formData,
  });
};

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
