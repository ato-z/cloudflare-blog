import { Module } from '@ato-z/ioc';
import { ControllerArticleV1 } from './v1';

export const moduleArticle = new Module({
  prefix: 'article',
  controller: [ControllerArticleV1],
});
