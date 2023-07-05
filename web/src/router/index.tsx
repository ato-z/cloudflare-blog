import { HomeRouter } from './home';
import { ArticleRouter } from './article';
import { DatabaseRouter } from './database';
import { ObserverRouter } from './observer';
import { NoteRouter } from './note';
import { ImagesRouter } from './images';
import { PasserbyRouter } from './passerby';
import { ExceptionRouter } from './exception';
import { SelfRouter } from './self';

/** 路由列表 */
export const routes: RouteItem[] = [
  HomeRouter,
  ArticleRouter,
  ObserverRouter,
  NoteRouter,
  ImagesRouter,
  PasserbyRouter,
  ExceptionRouter,
  DatabaseRouter,
  SelfRouter,
];
