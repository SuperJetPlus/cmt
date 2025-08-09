import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiPackage } from 'react-icons/fi';
import { FaStoreAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import useCart from '../../hooks/useCart';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const cartItemCount = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target) && !e.target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };

    const handleEscape = e => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavLinkClick = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className={`ecommerce-header${scrolled ? ' scrolled' : ''}`}>
      <div className="top-bar">
        <div className="container">
          <div className="contact-info">
            <span>📞 +51 (056) 272272</span>
            <span>✉️ adm_mods@stayhome.li</span>
          </div>
          <div className="user-actions">
            {currentUser ? (
              <>
                <span>¡Hola, {currentUser.fullName || currentUser.email}!</span>
                {currentUser.role === 'admin' && (
                  <NavLink to="/admin" className="admin-link">
                    <FiPackage /> Panel Admin
                  </NavLink>
                )}
                <button onClick={handleLogout}>Cerrar sesión</button>
              </>
            ) : (
              <>
                <NavLink to="/login">Iniciar sesión</NavLink>
                <NavLink to="/register">Registrarse</NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="container">
          <div className="logo-container">
            <Link to="/" className="logo">
              <FaStoreAlt className="logo-icon" />
              <span>Textil CMT</span>
            </Link>
          </div>

          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>

          <div className="header-icons">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? 'icon-link active' : 'icon-link'
              }
            >
              <FiUser />
              <span className="tooltip">Mi cuenta</span>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? 'icon-link cart-link active' : 'icon-link cart-link'
              }
            >
              <FiShoppingCart />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              <span className="tooltip">Carrito</span>
            </NavLink>
          </div>
        </div>
      </div>

      <nav
        className={`main-nav${menuOpen ? ' active' : ''}`}
        ref={navRef}
      >
        <div className="container">
          <ul>
            <li>
              <NavLink to="/" exact="true" onClick={handleNavLinkClick}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={handleNavLinkClick}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" onClick={handleNavLinkClick}>
                Categorías
              </NavLink>
            </li>
            <li>
              <NavLink to="/offers" onClick={handleNavLinkClick}>
                Ofertas
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={handleNavLinkClick}>
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={handleNavLinkClick}>
                Contacto
              </NavLink>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
