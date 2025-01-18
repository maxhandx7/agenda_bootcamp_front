import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_URL_USER;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(ApiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user); // Actualiza el estado con los datos del usuario
        } catch (error) {
          console.error('Error fetching user data', error);
        }
        setIsLoggedIn(true);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // Redirigir al inicio
    location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <a className="navbar-brand" href="#">
          {user && user.name ? "Hola, " + user.name : "Agenda Personal"}
        </a>
        <button
          className="navbar-toggler"
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
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Registro
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="btn btn-info nav-link" href="/contacts">
                    Contactos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-info nav-link" href="/new-contact">
                    Nuevo Contacto
                  </a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-danger nav-link" onClick={handleLogout} href="#">
                    Salir
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
