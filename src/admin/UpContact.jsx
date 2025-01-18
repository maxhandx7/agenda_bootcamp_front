import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


const EditContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const apiUrl = import.meta.env.VITE_URL_CONTACT;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); 
  useEffect(() => {
    const fetchContact = async () => {
      const token = localStorage.getItem('token'); 

      if (!token) {
        Swal.fire('Error', 'No estás autenticado', 'error');
        return;
      }

      try {
        const response = await axios.get(apiUrl+`/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          name: response.data.name,
          phone: response.data.phone,
        });
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar el contacto', 'error');
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      await axios.put(
        apiUrl+`/${id}`,
        {
          name: formData.name,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire('Éxito', 'Contacto actualizado con éxito', 'success');
      navigate('/contacts'); // Redirigir a la página principal u otra página
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el contacto', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Contacto</h2>
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
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar Contacto'}
        </button>
      </form>
    </div>
  );
};

export default EditContact;
