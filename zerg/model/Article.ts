import { imageFind } from '@zerg/helper';
import { ModelBase } from './Base';

export type Article = {
  id: number;
  title: string;
  subTitle: string;
  cover?: number;
  tags: string;
  intro?: string;
  content: string;
  status: number;
  createDate: string;
  updateDate: string;
  pubDate?: string;
  deleteDate?: string | null;
};

export class ModelArticle extends ModelBase<Article> {
  name = 'article';
  hideing = ['deleteDate'] as const;
  appending = {};
  getting = {
    pubDate(value: unknown, key: string, data: Article) {
      if (value === undefined || value === null) {
        return data.createDate;
      }

      return <string>value;
    },

    cover(value: unknown) {
      return imageFind.getById(value);
    },
  };
}
