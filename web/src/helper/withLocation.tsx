import { Location } from 'react-router-dom';
import { routeChildren } from '../components/router/withItems';
import { upDocumentTitle } from '.';

const titleMap = routeChildren
  .map(item => ({
    title: item.label,
    meta: item.meta,
    path: new RegExp(item.path.replace(/\:[a-zA-Z_-]+/g, '.+')),
  }))
  .reverse();

/**
 * 更新页面title
 */
export const withLocation = (location: Location) => {
  const curRouter = titleMap.find(item => item.path.test(location.pathname));
  if (curRouter !== undefined) {
    const { meta } = curRouter;
    if (meta) {
      upDocumentTitle(meta.title);

      return meta.paths;
    }

    return [];
  }
  return [];
};
