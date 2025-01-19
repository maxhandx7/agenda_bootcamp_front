import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_URL_CONTACT;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token
        const resuyponse = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setContacts(resuyponse.data);
      } catch (error) {
        console.error('Error al obtener los contactos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const deleteContact = (id) => {
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
        const token = localStorage.getItem('token'); // Obtener el token
        axios
          .delete(apiUrl + `/${id}`, {
            headers: {
              Authorization: `Bearer ${token}` // Incluir el token en los encabezados
            }
          })
          .then(() => {
            setContacts(contacts.filter((contact) => contact.id !== id));
            Swal.fire('Eliminado', 'El contacto ha sido eliminado.', 'success');
          })
          .catch((error) => {
            console.error('Error al eliminar el contacto:', error);
            Swal.fire('Error', 'No se pudo eliminar el contacto.', 'error');
          }
          );
      }
    });
  };

  const columns = [
    {
      name: 'Nombre',
      selector: (row) => (
        <a
          href="#"
          onClick={() => navigate(`/contact-details/${row.id}`)}
          style={{ textDecoration: 'none', color: '#007bff' }}
        >
          {row.name}
        </a>
      ),
    },
    {
      name: 'Teléfono',
      selector: (row) => row.phone,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => navigate(`/edit-contact/${row.id}`)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteContact(row.id)}
          >
            <FaTrash />
          </button>
        </>
      ),
    },
  ];

  if (loading) {
    return <div className="spinner-border  mt-3" role="status">
      <span className="sr-only">Loading...</span>
    </div>;
  }

  return (
    <div className="container mt-5">
      <h2>Contactos</h2>
      <DataTable columns={columns} data={contacts} pagination />
    </div>
  );
};

export default Contacts;
