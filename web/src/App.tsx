import { ConfigProvider, theme } from 'antd';
import { useTheme } from './store/theme';
import { appRouter } from '@web/components/router';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  const [themeJotai] = useTheme();
  const algorithm =
    themeJotai === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm;
  return (
    <ConfigProvider theme={{ algorithm }}>
      <RouterProvider router={appRouter} />
    </ConfigProvider>
  );
};

export default App;
