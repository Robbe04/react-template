import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-lg border-bottom border-white">
      <div className="container">
        <Link className="navbar-brand text-white fw-bold fs-4" to="/">
          React Template
        </Link>
        <button
          className="navbar-toggler border-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link text-white px-3 py-2 border border-white rounded" to="/">
                Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link text-white px-3 py-2 border border-white rounded ms-2" to="/users">
                Users
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white px-3 py-2 border border-white rounded ms-2" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white px-3 py-2 border border-white rounded ms-2" to="/login">
                Login
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}
