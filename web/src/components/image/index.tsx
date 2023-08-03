import { Image, ImageProps } from 'antd';

const AppImage = (prop: ImageProps = {}) => {
  const codeProp = { ...prop };
  return <Image {...codeProp} style={{ backgroundColor: codeProp.color }} />;
};

export default AppImage;
