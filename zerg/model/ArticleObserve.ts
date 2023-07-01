import { ModelBase } from './Base';

export type ArticleObserve = {
  id: number;
  uid: number;
  fromId: number;
  articleId?: number;
  content: string;
  state: number;
  createDate: string;
};

export class ModelArticleObserve extends ModelBase<ArticleObserve> {
  name = 'articleObserve';
  hideing = [] as const;
  appending = {};
  getting = {};
}
