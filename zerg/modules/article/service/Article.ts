import { ServiceTags } from '@zerg/service/Tags';
import { ArticleAddDto } from '../dto/Add';
import { date, getCurrentDate } from '@ato-z/helper';
import { ModelArticle, Article } from '@zerg/model/Article';
import { ArticleEditDto } from '../dto/Edit';
import { ExceptionParam } from '@zerg/exception';
import { PageParamDto } from '@zerg/dto';
import { ServicePage } from '@zerg/service/Page';

export class ServiceArticle {
  protected modelArticle = new ModelArticle();

  /** 列表 */
  async list(pageParam: PageParamDto) {
    const servicePage = new ServicePage<Article>(this.modelArticle, {
      and: { deleteDate: null },
    });

    return servicePage.list(pageParam, [
      'id',
      'title',
      'subTitle',
      'tags',
      'intro',
      'pubDate',
      'createDate',
    ]);
  }

  /** 详情 */
  async detail(id?: string | null) {
    if (typeof id !== 'string') {
      throw new ExceptionParam('id 不能为空');
    }

    const result = await this.modelArticle.find(id);
    if (result === null) {
      throw new ExceptionParam('文章不存在');
    }

    return result;
  }

  /**
   * 添加新的文章
   */
  async new(post: ArticleAddDto) {
    const tags = ServiceTags.deDuplication(post.tags);
    const createDate = date('y/m/d h:i:s', getCurrentDate());
    const row = {
      ...post,
      updateDate: createDate,
      createDate,
      tags,
    };

    const result = await this.modelArticle.insert(row);
    return result.meta;
  }

  /**
   * 更新文章
   */
  async edit(post: ArticleEditDto) {
    const { id } = post;
    if (post.tags) {
      post.tags = ServiceTags.deDuplication(post.tags);
    }

    const updateDate = date('y/m/d h:i:s', getCurrentDate());
    const result = await this.modelArticle.update(
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
    const result = await this.modelArticle.update(
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
