import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthentication } from '../contexts/authentication'; 

export default function PrivateRoute() {
  const { ready, isAuthed } = useAuthentication(); 
  const { pathname } = useLocation();

  if (!ready) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Loading...</h1>
            <p>
              Please wait while we are checking your credentials and loading the
              application.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthed) {
    return <Outlet />;
  }

  return <Navigate replace to={`/login?redirect=${pathname}`} />; 
}