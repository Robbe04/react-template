import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './components/home/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from './components/Layout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserList from './pages/user/UserList.jsx';
import ProductsList from "./pages/products/ProductsList.jsx";
import ProductDetail from "./pages/products/ProductDetail.jsx"
import { AuthenticationProvider } from './contexts/Authentication.context.jsx';
import Login from './pages/registration/Login.jsx';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/registration/Logout.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />, children: [
      {path: '/', element: <Home />},

      {path: '*', element: <NotFound />},

      {path: '/users', element : <PrivateRoute />, children : [
        {
          index : true,
          element : <UserList />
        }
      ]},

      {path : '/login', element : <Login/>},

      {path : '/logout', element : <Logout/>},

      {path: '/products', element: <PrivateRoute />, children : [
        {
          index : true,
          element : <ProductsList />
        },
        {
          path: ':id',
          element : <ProductDetail/>
        }
      ]} 
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthenticationProvider>
        <RouterProvider router={router} />
    </AuthenticationProvider>
  </StrictMode>,
);