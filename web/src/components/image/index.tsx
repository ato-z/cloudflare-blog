import { Image, ImageProps } from 'antd';
import { siteConfig } from '@web/config';
const { staticDomain } = siteConfig;
const AppImage = (prop: ImageProps = {}) => {
  const codeProp = { ...prop };
  if (typeof prop?.src === 'string') {
    codeProp.src = `${staticDomain}${prop.src}`;
  }

  return <Image {...codeProp} />;
};

export default AppImage;
