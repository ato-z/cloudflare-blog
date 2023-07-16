import 'vditor/dist/index.css';
import Vditor from 'vditor';
import { useEffect, useState } from 'react';
import { useTheme } from '@web/store/theme';

const style = {
  minHeight: '200px',
  maxHeight: 'calc(100vh - 320px)',
  OverflowY: 'scroll',
};

const div = <div id="vditor" style={style} className="vditor"></div>;

export const useMarkdown = (prop: { ctx?: string } = {}) => {
  const [vd, setVd] = useState<Vditor>();
  const [theme] = useTheme();
  const currentTheme = theme === 'light' ? 'classic' : 'dark';
  useEffect(() => {
    const vditor = new Vditor('vditor', {
      after: () => {
        vditor.setValue(prop.ctx ?? '');
        setVd(vditor);
      },
      minHeight: 200,
      counter: { enable: true },
      theme: currentTheme,
      preview: {
        theme: {
          current: currentTheme,
          list: {
            antDesign: 'Ant Design',
            暗黑: 'Dark',
            明亮: 'Light',
            微信: 'WeChat',
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (vd !== undefined) {
      vd.setTheme(theme === 'light' ? 'classic' : 'dark');
    }
  }, [theme, vd]);

  return [vd, div] as unknown as [Vditor, JSX.Element];
};
