import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaPhone, FaCamera, FaTrashAlt, FaPen } from 'react-icons/fa';


const ContactDetails = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_URL_CONTACT;
  const Url = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(apiUrl + `/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContact(response.data);
      } catch (error) {
        console.error('Error al obtener el contacto:', error);
        Swal.fire('Error', 'No se pudo obtener la información del contacto', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        axios
          .delete(apiUrl`/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire('Eliminado', 'El contacto ha sido eliminado', 'success');
          })
          .catch((error) => {
            console.error('Error al eliminar el contacto:', error);
            Swal.fire('Error', 'No se pudo eliminar el contacto', 'error');
          });
      }
    });
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  if (!contact) {
    return <div className="text-center mt-5">Contacto no encontrado</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="row">
          <div className="col-md-4">
            <img
              src={contact.photo ? Url + `/${contact.photo}` : 'https://unsplash.it/400/200'}
              className="card-img"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              alt="Contacto"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{contact.name}</h5>
              <p className="card-text">
                <FaPhone /> {contact.phone}
              </p>
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => window.location.href = `/edit-contact/${contact.id}`}
                >
                  <FaPen />
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
