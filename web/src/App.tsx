import { ConfigProvider, theme } from 'antd';
import { useTheme } from './store/theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from './components/loading';

const App = () => {
  const [themeJotai] = useTheme();
  const algorithm =
    themeJotai === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm;

  const [router, setRouter] = useState(
    null as unknown as ReturnType<typeof createBrowserRouter>,
  );

  useEffect(() => {
    import('@web/components/router').then(res => {
      setRouter(res.default);
    });
  }, [setRouter]);

  return (
    <ConfigProvider theme={{ algorithm }}>
      {router ? <RouterProvider router={router} /> : <Loading />}
    </ConfigProvider>
  );
};

export default App;
