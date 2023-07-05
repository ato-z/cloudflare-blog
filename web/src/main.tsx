import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/reset.css';
import './index.css';

import('./App.tsx').then(({ default: App }) => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
