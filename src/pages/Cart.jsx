import React, { useState } from 'react';
import useCart from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [authWarning, setAuthWarning] = useState(false);

  const {
    cart,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    finalizePurchase,
  } = useCart();

  const handlePurchase = () => {
    if (!currentUser) {
      setAuthWarning(true);
      setTimeout(() => {
        setAuthWarning(false);
        navigate('/login');
      }, 1800);
      return;
    }
    finalizePurchase();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <h2>Tu carrito está vacío 🛒</h2>
        <p>Explora productos y añade lo que te guste.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Carrito de Compras</h2>
      <p className="item-count">
        Tienes {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'} en tu carrito
      </p>

      {authWarning && (
        <div className="auth-warning">
          ⚠️ Debes iniciar sesión para finalizar tu compra
        </div>
      )}

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio unitario: S/. {item.price.toFixed(2)}</p>
              <p>Subtotal: S/. {(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button
              className="remove-button"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total a pagar: S/. {getTotalPrice()}</h3>
        <button className="checkout-button" onClick={handlePurchase}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
