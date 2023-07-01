import { Context, Controller, GET, PATCH, POST } from '@ato-z/ioc';
import { ArticleAddDto } from '../dto/Add';
import { ServiceArticle } from '../service/Article';
import { ArticleEditDto } from '../dto/Edit';
import { ArticlePageDto } from '../dto/ArticlePage';

@Controller('v1')
export class ControllerArticleV1 {
  /**
   * @api {get} /article/v1/list   文章列表
   * @apiVersion 1.0.0
   * @apiName articleList
   * @apiGroup article
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiParam {String} [start=0]      跳过条目
   * @apiParam {String} [end=15]       获取条目
   * @apiParam {String} [title]        标题
   * @apiParam {String} [tags]         标签
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   *    "total": 6,
   *    "list": [
   *      {
   *        "id": 8,
   *        "title": "标题",
   *        "subTitle": "短标题",
   *        "tags": ",标签1,标签2,标签3,",
   *        "intro": "简介",
   *        "pubDate": "2023/06/28 20:15:24",
   *        "createDate": "2023/06/28 20:15:24"
   *      },
   *      ...
   *    ]
   * }
   */
  @GET('list') async list() {
    const pageParam = new ArticlePageDto();
    await pageParam.check();
    const serviceArticle = new ServiceArticle();
    const result = await serviceArticle.list(pageParam);
    return result;
  }

  /**
   * @api {get} /article/v1/detail   文章详情
   * @apiVersion 1.0.0
   * @apiName articleDetail
   * @apiGroup article
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiParam {String} id     文章id
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * "id": 8,
   * "title": "标题",
   * "subTitle": "短标题",
   * "cover": {
        "id": 6,
        "path": "ddb24ccdd533c3272cc1257a782599de1ddf8caf",
        "thumb": null,
        "hash": "ddb24ccdd533c3272cc1257a782599de1ddf8caf",
        "width": 959,
        "height": 959,
        "size": 149154,
        "color": "#f2f2f2",
        "from": 1,
        "createDate": "2023\\-06\\-26 15:52:50"
      },
      "tags": ",测试1,测试2,",
      "intro": "简介...",
      "content": "xxxx",
      "createDate": "2023/06/28 15:41:05",
      "updateDate": "2023/06/28 15:41:05",
      "pubDate": "2023/06/28 15:41:05"
   * }
   */
  @GET('detail') async detail({ params }: Context) {
    const { id } = params;
    const serviceArticle = new ServiceArticle();
    const detail = await serviceArticle.detail(id);
    return detail;
  }

  /**
   * @api {post} /article/v1/add   新增文章
   * @apiVersion 1.0.0
   * @apiName articleAdd
   * @apiGroup article
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiBody {String} title     文章标题
   * @apiBody {String} subTitle  短标题
   * @apiBody {Int}    cover     封面id
   * @apiBody {String} intro     简介
   * @apiBody {String} tags      标签
   * @apiBody {String} content   内容
   * @apiBody {String} pubDate   发布时间
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * }
   */
  @POST('add') async add() {
    const post = new ArticleAddDto();
    await post.check();
    const serviceArticle = new ServiceArticle();
    const result = await serviceArticle.new(post);
    return result;
  }

  /**
   * @api {PATCH} /article/v1/edit   编辑文章
   * @apiVersion 1.0.0
   * @apiName articleEdit
   * @apiGroup article
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiBody {Int}    id        文章id
   * @apiBody {String} [title]     文章标题
   * @apiBody {String} [subTitle]  短标题
   * @apiBody {Int}    [cover]     封面id
   * @apiBody {String} [intro]     简介
   * @apiBody {String} [tags]      标签
   * @apiBody {String} [content]   内容
   * @apiBody {String} [pubDate]   发布时间
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * }
   */
  @PATCH('/edit') async put() {
    const post = new ArticleEditDto();
    await post.check();
    const serviceArticle = new ServiceArticle();
    const result = await serviceArticle.edit(post);
    return result;
  }

  /**
   * @api {PATCH} /article/v1/remove   删除文章
   * @apiVersion 1.0.0
   * @apiName articleEdit
   * @apiGroup article
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiBody {string}    ids        文章id1,文章id2,文章id3
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * }
   */
  @PATCH('/remove') async remove({ params }: Context) {
    const { id } = params;
    const serviceArticle = new ServiceArticle();
    const result = await serviceArticle.remove(id);
    return result;
  }
}
