import { useLocation, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  /**
   * Gaat naar de home pagina
   */
  const handelGoHome = () => {
   navigate('/', {replace : true})
  }

  return (
    <div>
      <h1>Error 404</h1>
      <p>Er is geen pagina met als url {pathname}</p>
      <button onClick={handelGoHome}>Go Home</button>
    </div>
  );
};
export default NotFound;