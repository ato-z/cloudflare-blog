import { POST, Controller, GET } from '@ato-z/ioc';
import { ServiceUploadImage } from '@zerg/service/UploadImage';
import { ImgBase64Dto } from '../dto/ImgBase64';
import { PageParamDto } from '@zerg/dto';

@Controller('v1')
export class ControllerUploadV1 {
  /**
   * @api {post} /upload/v1/img/base64   上传图像
   * @apiVersion 1.0.0
   * @apiName uploadImage
   * @apiGroup upload
   *
   * @apiHeader {String}   Content-Type multipart/form-data;
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiBody {String}    img      base64格式的图片
   * @apiBody {String}    thumb    缩略图
   * @apiBody {Int}       width    宽度
   * @apiBody {Int}       height   高度
   * @apiBody {String}    color    颜色色码
   */
  @POST('img/base64') async img() {
    const post = new ImgBase64Dto();
    await post.check();
    const serviceUpload = new ServiceUploadImage();
    const result = await serviceUpload.byBase64(post);
    return result;
  }

  /**
   * @api {get} /upload/v1/img/list   已上传的图像列表
   * @apiVersion 1.0.0
   * @apiName uploadImageList
   * @apiGroup upload
   *
   * @apiParam {String} [start=0]      跳过条目
   * @apiParam {String} [end=15]       获取条目
   *
   * @apiBody {String}    color    颜色色码
   */
  @GET('img/list') async imgList() {
    const pageParam = new PageParamDto();
    await pageParam.check();
    const serviceUpload = new ServiceUploadImage();
    return serviceUpload.list(pageParam);
  }
}
