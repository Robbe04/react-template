import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './components/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from './components/Layout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Layout />, children: [
      {path: '/', element: <Home />},
      {path: '*', element: <NotFound />},
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);