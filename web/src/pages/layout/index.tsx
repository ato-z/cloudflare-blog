import { masterDataGet } from '@web/api';

export const IframeLayout = () => {
  const data = masterDataGet();
  data.then(console.log);
  return <div>框架</div>;
};
