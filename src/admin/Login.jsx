import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Hacer la solicitud de login a la API
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      // Si el login es exitoso, redirigir al usuario
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/contacts'); // Redirigir a la página de contactos
        location.reload();
      }
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
    

  };

  return (
    <div className="container mt-5">
      <div class="row">
        <div class="col-xs-12">
          <div class="center-block">
            <h2>Iniciar sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  <FaUser /> Nombre de usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <FaLock /> Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
