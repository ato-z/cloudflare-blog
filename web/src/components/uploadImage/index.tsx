import { Button, Upload } from 'antd';
import { LoadingOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload/interface';

import { useCallback, useState } from 'react';
import { getBase64 } from '@web/helper/codeImageFile';
import { imageUplaod } from '@web/api/public';
import { tailErr } from '@web/helper';
import AppImage from '@web/components/image';

type UploadSuccess = (op: { id: number; path: string }) => void;

/** 自定义上传方法 */
const uploadRequest = async <R extends { file: string | Blob | RcFile }>(
  data: R,
  cb: { success: (op: { id: number; path: string }) => void; over: () => void },
) => {
  try {
    if (!(data.file instanceof File)) {
      throw new Response(`未支持的上传类型${typeof data.file}`);
    }

    const result = await imageUplaod(data.file);
    cb.success(result);
  } catch (err: unknown) {
    tailErr(err);
  }

  cb.over();
};

const UploadBtn = ({ loading }: { loading: boolean }) => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const UploadImage = ({
  onSuccess,
  cover,
}: {
  onSuccess: UploadSuccess;
  cover?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(cover ?? '');
  /** 用户点击上传触发 */
  const handleChange: UploadProps['onChange'] = async (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      if (info.file.originFileObj) {
        const url = await getBase64(info.file.originFileObj);
        setImageUrl(url);
      }
    }
  };

  /** 上传请求 */
  const customRequest = useCallback(
    (data: any) => {
      uploadRequest(data, {
        success: onSuccess,
        over() {
          setLoading(false);
        },
      });
    },
    [setLoading, onSuccess],
  );

  return (
    <Upload
      style={{ position: 'relative' }}
      listType="picture-card"
      maxCount={1}
      showUploadList={false}
      onChange={handleChange}
      customRequest={customRequest}
    >
      {imageUrl ? (
        <AppImage
          src={imageUrl}
          alt="avatar"
          preview={false}
          style={{ width: '100%', height: '100%', borderRadius: '100px' }}
        />
      ) : (
        <UploadBtn loading={loading} />
      )}
    </Upload>
  );
};

export default UploadImage;
