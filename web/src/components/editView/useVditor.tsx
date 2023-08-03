import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useTheme } from '@web/store/theme';
import { useEffect, useMemo, useState } from 'react';

// 内容主题配置
const _preview = {
  theme: {
    current: 'light',
    path: '/css/content-theme',
    list: {
      dark: '暗黑',
      light: '明亮',
      wechat: '微信',
    },
  },
};

/**
 * 上传
 * https://b3log.org/vditor/demo/advanced-upload.html
 */
const uploadHandle = () => {
  return {
    accept: 'image/*',
    async handler() {
      return '暂不支持直接在编辑器中直接上传图像';
    },
  };
};

export const useVditor = (ctx: string, style: Record<string, string>) => {
  const div = useMemo(
    () => <div id="vditor" style={style} className="vditor"></div>,
    [],
  );
  const [theme] = useTheme();
  const [vd, setVd] = useState<Vditor>();
  const currentTheme = theme === 'light' ? 'classic' : 'dark';

  const preview = useMemo(
    () => ({
      ..._preview,
      theme: { ..._preview.theme, current: currentTheme },
    }),
    [currentTheme],
  );

  useEffect(() => {
    const store = {} as { vditor: Vditor };
    store.vditor = new Vditor('vditor', {
      after: () => {
        store.vditor.setValue(ctx);
        setVd(store.vditor);
      },
      minHeight: 200,
      counter: { enable: true },
      theme: currentTheme,
      preview,
      upload: uploadHandle(),
    });
  }, [setVd]);

  return [vd!, div] as const;
};
