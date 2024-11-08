import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const handleLogin = () => {
    setLoginMessage(false);
  };

  return (
    <>
      <header className="app-header">
        <h1>File Upload App</h1>
        <nav>
          <ul>
            {token ? (
              <>
                <li>
                  <Link to="/files">My Files</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={handleLogin}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      {loginMessage && <h2>Please login to contine</h2>}
    </>
  );
};

export default Header;
