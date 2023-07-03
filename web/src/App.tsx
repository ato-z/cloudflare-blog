import { Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import { Login } from '@web/pages/login';
import { RequireAuth } from '@web/pages/auth';
import { IframeLayout } from '@web/pages/layout';

const App = () => (
  <Routes>
    <Route
      path="/"
      element={
        <RequireAuth>
          <IframeLayout />
        </RequireAuth>
      }
    />

    <Route path="/login" element={<Login />} />
  </Routes>
);

export default App;
