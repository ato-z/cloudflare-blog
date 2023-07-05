import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './components/loading/index.tsx';
import 'antd/dist/reset.css';
import './index.css';

const App = lazy(() => import('./App.tsx'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Loading>
      <App />
    </Loading>
  </React.StrictMode>,
);
