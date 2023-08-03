import { useVditor } from './useVditor';

const style = {
  minHeight: '200px',
  maxHeight: 'calc(100vh - 320px)',
  OverflowY: 'scroll',
};

export const useMarkdown = (prop: { ctx?: string } = {}) => {
  const [vd, div] = useVditor(prop.ctx ?? '', style);
  return [vd, div] as const;
};
