import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-dark">
      <nav className="container py-2 navbar navbar-expand-sm navbar-dark">
        <a href="/" className="navbar-brand">
          <h3>Dashboard</h3>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/account" reloadDocument>
                Accounts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" reloadDocument>
                Profiles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/campaign" reloadDocument>
                Camaigns
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
