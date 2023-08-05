type RouteItem = {
  label: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'group';
  path: string;

  meta: {
    title: string;
    paths: Array<{ title: string; path: string }>;
  };

  hide?: boolean;

  element: React.ReactNode | null;
  children?: RouteItem[];
  errorElement?: React.ReactNode;

  lazy?: import('react-router-dom').LazyRouteFunction<IndexRouteObject>;
  loader?: import('react-router-dom').IndexRouteObject['loader'];
  action?: import('react-router-dom').IndexRouteObject['action'];
  handle?: import('react-router-dom').NonIndexRouteObject['handle'];
};

type LikePromise<T> = Promise<T> | T;

type FormItem = {
  element: React.ReactNode;
  name: string;
  label: React.ReactNode;
  rules?: Rule[];
  labelAlign?: 'left' | 'right';
};

type PicItem = {
  id: number;
  path: string;
  thumb: null | string;
  hash: string;
  width: number;
  height: number;
  size: number;
  color: string;
  from: number;
  createDate: string;
};

type Master = {
  id: number;
  cover: PicItem | null;
  nickname: string;
  name: string;
  intro: string;
  createDate: string;
};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
