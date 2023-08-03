import { createApp } from '@zerg/helper';
import { moduleArticle } from '@zerg/modules/article/controller';
import { moduleDatabase } from '@zerg/modules/database/controller';
import { moduleException } from '@zerg/modules/exception/controller';
import { moduleMaster } from '@zerg/modules/master/controller';
import { moduleNote } from '@zerg/modules/note/controller';
import { modulePasserby } from '@zerg/modules/passerby/controller';
import { moduleUpload } from '@zerg/modules/upload/controller';

/** 导入所有模块，只推荐在本地开发使用 */
const app = createApp(
  moduleArticle,
  moduleDatabase,
  moduleException,
  moduleMaster,
  moduleNote,
  modulePasserby,
  moduleUpload,
);

export default app;
