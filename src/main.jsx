import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Display from './routes/Display/index.jsx';
import Root from './routes/Root/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/display',
    element: <Display />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
