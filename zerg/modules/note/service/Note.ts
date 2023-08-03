import { ModelNote, Note } from '@zerg/model/Note';
import { ServicePage } from '@zerg/service/Page';
import { NoteAddDto } from '../dto/Add';
import { ServiceTags } from '@zerg/service/Tags';
import { date, getCurrentDate } from '@ato-z/helper';
import { NoteEditDto } from '../dto/Edit';
import { ExceptionParam } from '@zerg/exception';
import { NotePageDto } from '../dto/ArticlePage';

export class ServiceNote {
  modelNote = new ModelNote();

  /** 列表 */
  async list(pageParam: NotePageDto) {
    const where = { deleteDate: null };
    if (pageParam.title) {
      Reflect.set(where, 'title', ['LIKE', `%${pageParam.title}%`]);
    }
    if (pageParam.tags) {
      Reflect.set(where, 'tags', ['LIKE', `%,${pageParam.tags},%`]);
    }
    const servicePage = new ServicePage<Note>(this.modelNote, {
      and: where,
    });

    return servicePage.list(pageParam, [
      'id',
      'title',
      'tags',
      'content',
      'createDate',
      'updateDate',
    ]);
  }

  /** 详情 */
  async detail(id?: string | null) {
    if (typeof id !== 'string') {
      throw new ExceptionParam('id 不能为空');
    }

    const result = await this.modelNote.find(id);
    if (result === null) {
      throw new ExceptionParam('小记不存在');
    }

    return result;
  }

  /**
   * 新增小记
   */
  async new(post: NoteAddDto) {
    const tags = ServiceTags.deDuplication(post.tags);
    const createDate = date('y/m/d h:i:s', getCurrentDate());
    const row = {
      ...post,
      updateDate: createDate,
      createDate,
      tags,
    };

    const result = await this.modelNote.insert(row);
    return result.meta;
  }

  /**
   * 编辑小记
   */
  async edit(post: NoteEditDto) {
    const { id } = post;
    if (post.tags) {
      post.tags = ServiceTags.deDuplication(post.tags);
    }

    const updateDate = date('y/m/d h:i:s', getCurrentDate());
    const result = await this.modelNote.update(
      { updateDate, ...post },
      {
        where: { and: { id } },
      },
    );
    return result.meta;
  }

  /**
   * 软删除
   */
  async remove(ids: string) {
    if (typeof ids !== 'string') {
      throw new ExceptionParam('id不能为空');
    }

    const idSet = new Set(ids.split(',').filter(i => i));
    const result = await this.modelNote.update(
      {
        deleteDate: date('y/m/d h:i:s', getCurrentDate()),
      },
      {
        where: {
          and: { id: ['IN', [...idSet]] },
        },
      },
    );

    return result.meta;
  }
}
