import { ImageProp } from '@web/api/images';
import { Image, Space } from 'antd';

const ImageItem = ({ img }: { img: ImageProp }) => {
  return (
    <Space
      align="center"
      style={{ width: '100%', height: '100%', padding: '5px' }}
    >
      <Image
        src={img.thumb ?? img.path}
        preview={{ src: img.path }}
        color={img.color}
      />
    </Space>
  );
};

export default ImageItem;
