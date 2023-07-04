import { ConfigProvider, theme } from 'antd';
import { useTheme } from './store/theme';
import { lazy } from 'react';

const AppRouter = lazy(() => import('./components/router'));

const App = () => {
  const [themeJotai] = useTheme();
  const algorithm =
    themeJotai === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm;
  return (
    <ConfigProvider theme={{ algorithm }}>
      <AppRouter />
    </ConfigProvider>
  );
};

export default App;
