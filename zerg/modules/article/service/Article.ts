import { ServiceTags } from '@zerg/service/Tags';
import { ArticleAddDto } from '../dto/Add';
import { date, getCurrentDate } from '@ato-z/helper';
import { ModelArticle, Article } from '@zerg/model/Article';
import {
  ModelArticleObserve,
  ArticleObserve,
} from '@zerg/model/ArticleObserve';
import { ArticleEditDto } from '../dto/Edit';
import { ExceptionParam } from '@zerg/exception';
import { ServicePage } from '@zerg/service/Page';
import { ArticlePageDto } from '../dto/ArticlePage';
import { ArticleObservePageDto } from '../dto/ArticleObservePage';
import { ARTICLE_STATUS } from '@zerg/enum';

export class ServiceArticle {
  protected modelArticle = new ModelArticle();
  protected modelArticleObserve = new ModelArticleObserve();

  /** 列表 */
  async list(pageParam: ArticlePageDto) {
    const where = { deleteDate: null };
    if (pageParam.title) {
      Reflect.set(where, 'title', ['LIKE', `%${pageParam.title}%`]);
    }
    if (pageParam.tags) {
      Reflect.set(where, 'tags', ['LIKE', `%,${pageParam.tags},%`]);
    }
    const servicePage = new ServicePage<Article>(this.modelArticle, {
      and: where,
    });

    return servicePage.list(pageParam, [
      'id',
      'title',
      'subTitle',
      'tags',
      'cover',
      'intro',
      'pubDate',
      'status',
      'createDate',
    ]);
  }

  /** 所有评论列表 */
  async observeList(pageParam: ArticleObservePageDto) {
    const where = {};
    if (pageParam.uid) {
      Reflect.set(where, 'uid', pageParam.uid);
    }
    if (pageParam.articleId) {
      Reflect.set(where, 'articleId', pageParam.articleId);
    }

    const whereAnd = Object.keys(where).length ? where : undefined;
    const servicePage = new ServicePage<ArticleObserve>(
      this.modelArticleObserve,
      {
        and: whereAnd,
      },
    );

    return servicePage.list(pageParam);
  }

  /** 评论 */
  async observeOne(id: string) {
    const { modelArticleObserve } = this;
    const codeList = await modelArticleObserve.select({
      where: { and: { articleId: id } },
    });

    return codeList.list;
  }

  /** 详情 */
  async detail(id: string) {
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
      status: ARTICLE_STATUS.DRAFT,
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
