import type { RcFile } from 'antd/es/upload/interface';
import { fillZero } from '.';

/**
 * 获取图像的base64
 */
export const getBase64 = (img: RcFile | File) =>
  new Promise<string>(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(img);
  });
/**
 * 获取图片信息
 */
export const getImageData = async (
  img: HTMLImageElement,
  op: { width: number; type: 'image/jpeg' | 'image/png' } = {
    width: 120,
    type: 'image/jpeg',
  },
) => {
  const { width, type } = op;
  const { naturalWidth, naturalHeight } = img;
  const canvas = document.createElement('canvas');

  // 缩小比例
  const height = (width / naturalWidth) * naturalHeight;

  // 创建画布
  canvas.width = width;
  canvas.height = height;

  // 绘制环境
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, naturalWidth, naturalHeight, 0, 0, width, height);

  // 等待绘制完成返回像素数据
  const { data } = await new Promise<ImageData>(resovle => {
    const f = () => {
      try {
        resovle(ctx.getImageData(0, 0, width, height));
      } catch {
        requestAnimationFrame(f);
      }
    };
    f();
  });

  let cur = 0;
  const rgba = [0, 0, 0, 0];
  while (cur < data.length) {
    rgba[0] += data[cur++];
    rgba[1] += data[cur++];
    rgba[2] += data[cur++];
    cur++;
  }

  const pxCount = width * height;
  const [r, g, b] = [
    Math.ceil(rgba[0] / pxCount),
    Math.ceil(rgba[1] / pxCount),
    Math.ceil(rgba[2] / pxCount),
  ];
  const color = `#${fillZero(r.toString(16))}${fillZero(
    g.toString(16),
  )}${fillZero(b.toString(16))}`;

  const thumb = canvas.toDataURL(type);
  return {
    color,
    width: naturalWidth,
    height: naturalHeight,
    thumb,
  };
};
