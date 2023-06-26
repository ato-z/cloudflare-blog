import { date } from '@ato-z/helper';
import { WranglerEnv } from '@ato-z/ioc/server/WranglerEnv';
import { ExceptionParam } from '@zerg/ exception';
import { appConfig } from '@zerg/config/app';
import { IMAGE_FROM } from '@zerg/enum';
import { ModelImage } from '@zerg/model/Image';
import { ImgBase64Dto } from '@zerg/modules/upload/dto/ImgBase64';
import { ServiceFile } from './File';
import sha from 'sha1';

const { maxImgFile } = appConfig;
export class ServiceUploadImage extends WranglerEnv {
  protected modelImage = new ModelImage();

  async byBase64(post: ImgBase64Dto) {
    const hash = sha(post.img);

    // 查看文件是否已上传过
    const data = await this.hashInD1(hash);
    if (data !== null) {
      return { id: data.id, path: hash };
    }

    // 保存到r2对象存储
    const uint8 = await this.saveToR2(hash, post);

    // 保存到d1数据库
    const result = await this.saveToD1(hash, uint8, post);
    return {
      id: result.meta.last_row_id,
      path: hash,
    };
  }

  private async hashInD1(hash: string) {
    const { modelImage } = this;
    console.log(hash);
    const result = await modelImage.select({
      where: {
        and: { hash },
      },
      limit: 1,
    });

    const { first } = result;
    return first;
  }

  private async saveToR2(hash: string, post: ImgBase64Dto) {
    const img = ServiceFile.base64ToUint8Array(post.img);
    const thumb = post.thumb
      ? ServiceFile.base64ToUint8Array(post.thumb)
      : null;
    if (img.byteLength >= maxImgFile) {
      throw new ExceptionParam(
        `img文件大小不超过${maxImgFile}, 当前${img.byteLength}`,
      );
    }

    if (thumb && thumb.byteLength >= maxImgFile) {
      throw new ExceptionParam(
        `thumb文件大小不超过${maxImgFile}, 当前${thumb.byteLength}`,
      );
    }

    const { R2Static } = this.env;
    await R2Static.put(hash, img);
    if (thumb) {
      await R2Static.put(`${hash}-thumb`, thumb);
    }

    return img;
  }

  private saveToD1(hash: string, img: ArrayBuffer, post: ImgBase64Dto) {
    const from = IMAGE_FROM.R2;
    const createDate = date('y-m-d h:i:s');
    const { modelImage } = this;
    const row = {
      size: img.byteLength,
      path: hash,
      width: post.width,
      height: post.height,
      color: post.color,
      createDate,
      from,
      hash,
    };

    if (post.thumb) {
      Reflect.set(row, 'thumb', `${hash}-thumb`);
    }

    return modelImage.insert(row);
  }
}
