import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Display from './routes/Display/index.jsx';
import Root from './routes/Root/index.jsx';
import ErrorMessage from './components/ErrorMessage/index.jsx';

const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    element: <Root />,
    errorElement: <ErrorMessage />
  },
  {
    path: import.meta.env.BASE_URL + 'display',
    element: <Display />,
    errorElement: <ErrorMessage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
