import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './admin/Login';
import Register from './admin/Register';
import Contacts from './admin/Contacts';
import NewContacts from './admin/NewContact';
import EditContact from './admin/UpContact';
import Detalles from './admin/DetailContact';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';



function App() {
  return (
    <div className="App">
      <header className="App-header">

    <Router>
    <Navbar />  
      <Routes>
        <Route path="/" element={<Login />} /> {/* Página de Login */}
        <Route path="/contacts" element={<Contacts />} /> {/* Página de contactos */}
        <Route path="/new-contact" element={<NewContacts />} /> {/* Página de nuevo contactos */}
        <Route path="/edit-contact/:id" element={<EditContact />} /> {/* Página para editar */}
        <Route path="/contact-details/:id" element={<Detalles />} /> {/* Página para editar */}
        <Route path="/register" element={<Register />} /> {/* Pagina para registro */}
      </Routes>
      <Footer />  
    </Router>
    </header>
    </div>
  );
}




export default App;
