type RouteItem = {
  label: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'group';
  path: string;

  hide?: boolean;

  element: React.ReactNode | null;
  children?: RouteItem[];
  errorElement?: React.ReactNode;

  lazy?: import('react-router-dom').LazyRouteFunction<IndexRouteObject>;
  loader?: import('react-router-dom').IndexRouteObject['loader'];
  action?: import('react-router-dom').IndexRouteObject['action'];
  handle?: import('react-router-dom').NonIndexRouteObject['handle'];
};
