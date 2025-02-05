import { useEffect } from 'react'; 
import { useAuthentication } from '../../contexts/authentication';

export default function Logout() {
  const { isAuthed, logout } = useAuthentication(); 

  useEffect(() => {
    logout();
  }, [logout]);

  if (isAuthed) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Logging out...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1>You were successfully logged out</h1>
        </div>
      </div>
    </div>
  );
}