import { Link } from "react-router-dom";


function Header() {
  
  const loginstatus = localStorage.getItem('loginstatus');
  
  return (
      <div class="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand ms-2" to="/">Taste Mein Best Sherey da Daba</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto me-5">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/detail/1">Cuisines</Link>
              </li>
              {loginstatus=='true' &&
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </a>
                
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/myacc">My account</Link></li>
                  <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                  <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                  <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                </ul>
                {/* <li><Link className="dropdown-item" to="/login">Login</Link></li> */}
              </li>
              }
              
              {loginstatus!='true' &&
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              }

            </ul>
          </div>
        </div>
      </nav>
      </div>

    );
  }
  
  export default Header;