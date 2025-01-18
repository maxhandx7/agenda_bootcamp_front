import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-3 mt-5">
      <div className="container">
        <p>
          © {new Date().getFullYear()} <a className="text-dark text-decoration-none" href="https://afdeveloper.com/" target="_blank" rel="noopener noreferrer">Alan Carabalí</a>
        </p>
        <p>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <i className="fa fa-linkedin"></i>
          </a>
        </p>
      </div>
    </footer>

  );
};

export default Footer;
