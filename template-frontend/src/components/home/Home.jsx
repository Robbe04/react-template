import { useAuthentication } from '../../contexts/authentication';

export default function Home() {
  const { isAuthed, user } = useAuthentication();
  return (
    <>
    <div
      className="d-flex justify-content-center align-items-center text-center text-light"
      style={{ height: '100vh', backgroundImage: 'linear-gradient(135deg, rgb(3, 255, 255), rgb(49, 94, 94))' }}
    >
      <div>
        <h1 className="display-1 font-weight-bold">React Template</h1>
        <h2 className="lead">Een eenvoudige React-template website met alle nodige componenten mogelijk.</h2>
      </div><br /><br />

      <div>
    {isAuthed ? (
        <div>Ingelogd als {user ? `${user.firstName} ${user.lastName}` : 'Niet ingelogd'}</div>
      ) : (
        <div>Je bent niet ingelogd</div>
      )}
    </div>
      
    </div>
    
    </>
  );
}
