import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from '@web/pages/auth';
import { IframeLayout } from '@web/pages/layout';
import { ConfigProvider, theme } from 'antd';

import { Login } from '@web/pages/login';
import { Home } from '@web/pages/home';
import { useTheme } from './store/theme';

const App = () => {
  const [themeJotai] = useTheme();
  const algorithm =
    themeJotai === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm;
  return (
    <ConfigProvider theme={{ algorithm }}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <IframeLayout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;
