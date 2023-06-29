import { Controller, DELETE, GET, PATCH, POST } from '@ato-z/ioc';
import { ServiceDb } from '../service/Db';
import { TablePageDto } from '../dto/TablePage';
import { TableEditDto } from '../dto/TableEdit';
import { TableRemoveDto } from '../dto/TableRemove';

@Controller('v1')
export class ControllerDatabaseV1 {
  /**
   * @api {get} /database/v1/tables   返回所有表名
   * @apiVersion 1.0.0
   * @apiName databaseTables
   * @apiGroup database
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   *
   * @apiSuccessExample {json} 成功响应:
    [
      {"name": "az_article"},
      ...
    ]
   */
  @GET('tables') async tables() {
    const server = new ServiceDb();
    const tables = await server.getTables();
    return tables;
  }

  /**
   * @api {get} /database/v1/dump   下载数据库
   * @apiVersion 1.0.0
   * @apiName databaseDump
   * @apiGroup database
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiSuccessExample {File} 发起下载
   */
  @GET('dump') async dump() {
    const server = new ServiceDb();
    const dump = await server.dump();
    return dump;
  }

  /**
   * @api {get} /database/v1/tables   返回指定表下的列表
   * @apiVersion 1.0.0
   * @apiName databaseTables
   * @apiGroup database
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiParam {String} [start=0]      跳过条目
   * @apiParam {String} [end=15]       获取条目
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   *    "total": 6,
   *    "list": [
   *    ]
   * }
   */
  @GET('list') async list() {
    const tablePageParma = new TablePageDto();
    await tablePageParma.check();
    const server = new ServiceDb();
    const list = await server.list(tablePageParma);
    return list;
  }

  /**
   * @api {PATCH} /database/v1/edit   编辑表数据
   * @apiVersion 1.0.0
   * @apiName databaseEdit
   * @apiGroup database
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiBody {String} tableName   表名
   * @apiBody {Int}    id          主键
   * @apiBody {Any}    data        表数据
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * }
   */
  @PATCH('edit') async edit() {
    const tableEdit = new TableEditDto();
    await tableEdit.check();
    const server = new ServiceDb();
    await server.edit(tableEdit);

    return { msg: 'ok' };
  }

  /**
   * @api {PATCH} /database/v1/remove   删除数据
   * @apiVersion 1.0.0
   * @apiName articleEdit
   * @apiGroup article
   *
   * @apiHeader {String}   Content-Type application/json
   * @apiHeader {String}   token 调用[获取临时token](#api-master-masterToken)获取
   *
   * @apiBody {String} tableName   表名
   * @apiBody {Int}    id          主键
   *
   * @apiSuccessExample {json} 成功响应:
   * {
   * }
   */
  @DELETE('remove') async remove() {
    const tableRemove = new TableRemoveDto();
    await tableRemove.check();
    const server = new ServiceDb();
    await server.remove(tableRemove);

    return { msg: 'ok' };
  }
}
