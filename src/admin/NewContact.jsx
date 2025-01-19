import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const NewContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    photo: null,
  });
  const apiUrl = "https://agenda-bootcamp-api.onrender.com/api/contacts";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0], // Guardar el archivo de la foto
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    if (!token) {
      Swal.fire('Error', 'No estás autenticado', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        apiUrl,
        {
          name: formData.name,
          phone: formData.phone,
          photo: formData.photo,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Incluir el token en los headers
          },
        }
      );

      Swal.fire('Éxito', 'Contacto creado con éxito', 'success');
      navigate('/contacts'); 
    } catch (error) {
      Swal.fire('Error', 'No se pudo crear el contacto', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nuevo Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Teléfono
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            name="phone"
            placeholder='+57'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Foto
          </label>
          <input
            type="file"
            className="form-control"
            id="photo"
            name="photo"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? (
                  <>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Cargando...</span> Creando...
                  </>
                ) : 'Crear contacto'}
        </button>
      </form>
    </div>
  );
};

export default NewContact;
