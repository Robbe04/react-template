import { Outlet, ScrollRestoration } from 'react-router-dom';
import NavBar from './Navbar';

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}