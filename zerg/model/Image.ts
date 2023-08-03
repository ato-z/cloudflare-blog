import { IMAGE_FROM } from '@zerg/enum';
import { ModelBase } from './Base';
import { codeOssPath } from '@zerg/helper';

export type Image = {
  id: number;
  path: string;
  hash: string;
  thumb?: string | null;
  width: number;
  height: number;
  size: number;
  color: string;
  from: IMAGE_FROM.R2;
  createDate: string;
};

export class ModelImage extends ModelBase<Image> {
  name = 'image';
  hideing = [];
  appending = {};
  getting = {
    path(value, key: string, data: Image) {
      if (data.from === IMAGE_FROM.R2) {
        return codeOssPath(value);
      }
      return value;
    },
    thumb(value, key: string, data: Image) {
      if (data.from === IMAGE_FROM.R2) {
        return codeOssPath(value);
      }
      return value;
    },
  };
}
