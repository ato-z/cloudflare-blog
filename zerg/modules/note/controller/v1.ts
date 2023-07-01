import { Context, Controller, GET, PATCH, POST } from '@ato-z/ioc';
import { ServiceNote } from '../service/Note';
import { NoteAddDto } from '../dto/Add';
import { NoteEditDto } from '../dto/Edit';
import { NotePageDto } from '../dto/ArticlePage';

@Controller('v1')
export class ControllerNoteV1 {
  /**
   * @api {get} /note/v1/list   小记列表
   * @apiVersion 1.0.0
   * @apiName noteList
   * @apiGroup note
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
   *        "tags": ",标签1,标签2,标签3,",
   *        "updateDate": "2023/06/28 20:15:24",
   *        "createDate": "2023/06/28 20:15:24"
   *      },
   *      ...
   *    ]
   * }
   */
  @GET('list') async list() {
    const pageParam = new NotePageDto();
    await pageParam.check();
    const serviceNote = new ServiceNote();
    const result = await serviceNote.list(pageParam);
    return result;
  }

  /**
   * @api {get} /note/v1/detail   小记详情
   * @apiVersion 1.0.0
   * @apiName noteDetail
   * @apiGroup note
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiParam {String} id     小记id
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * "id": 8,
   * "title": "标题",
      "tags": ",测试1,测试2,",
      "content": "xxxx",
      "createDate": "2023/06/28 15:41:05",
      "updateDate": "2023/06/28 15:41:05"
   * }
   */
  @GET('detail') async detail({ params }: Context) {
    const { id } = params;
    const serviceNote = new ServiceNote();
    const detail = await serviceNote.detail(id);
    return detail;
  }

  /**
   * @api {post} /note/v1/add   新增小记
   * @apiVersion 1.0.0
   * @apiName noteAdd
   * @apiGroup note
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiBody {String} title     小记标题
   * @apiBody {String} tags      标签
   * @apiBody {String} content   内容
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * }
   */
  @POST('add') async add() {
    const post = new NoteAddDto();
    await post.check();
    const serviceNote = new ServiceNote();
    const result = await serviceNote.new(post);
    return result;
  }

  /**
   * @api {PATCH} /note/v1/edit   编辑小记
   * @apiVersion 1.0.0
   * @apiName noteEdit
   * @apiGroup note
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiBody {Int}    id        小记id
   * @apiBody {String} [title]     小记标题
   * @apiBody {String} [tags]      标签
   * @apiBody {String} [content]   内容
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * }
   */
  @PATCH('/edit') async put() {
    const post = new NoteEditDto();
    await post.check();
    const serviceNote = new ServiceNote();
    const result = await serviceNote.edit(post);
    return result;
  }

  /**
   * @api {PATCH} /note/v1/remove   删除小记
   * @apiVersion 1.0.0
   * @apiName noteEdit
   * @apiGroup note
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiBody {string}    ids        小记id1,小记id2,小记id3
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * }
   */
  @PATCH('/remove') async remove({ params }: Context) {
    const { id } = params;
    const serviceNote = new ServiceNote();
    const result = await serviceNote.remove(id);
    return result;
  }
}
