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
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-primary text-white">
      <h1 className="display-1 fw-bold">Error 404</h1>
      <h2 className="mb-3">Pagina niet gevonden</h2>
      <p className="fs-5">
        Oeps! Deze url: "<span className="fw-bold text-light">{pathname}</span>" bestaat niet.
      </p>
      <button onClick={handelGoHome} className="btn btn-light btn-lg mt-3">
        Terug naar home
      </button>
    </div>
  );
};
export default NotFound;