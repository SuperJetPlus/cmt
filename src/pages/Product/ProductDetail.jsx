import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useInventory from '../../hooks/useInventory';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { inventory } = useInventory();
  const product = inventory.find((p) => p.id === id);
  const [showImageFullscreen, setShowImageFullscreen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setShowImageFullscreen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowImageFullscreen(false);
    };
    if (showImageFullscreen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showImageFullscreen]);

  if (!product) {
    return (
      <div className="product-detail not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto con ID "{id}" no existe o ha sido removido.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2500);
  };

  const renderStars = () => {
    const rounded = Math.round(product.rating);
    return (
      <div className="product-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rounded ? 'star filled' : 'star'}>★</span>
        ))}
        <span className="rating-value">({product.rating.toFixed(1)})</span>
      </div>
    );
  };

  const relatedProducts = inventory
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        className="product-detail-image"
        onClick={() => setShowImageFullscreen(true)}
        style={{ cursor: 'zoom-in' }}
      />

      {renderStars()}
      <p className="product-category">Categoría: {product.category}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Precio: S/. {product.price.toFixed(2)}</p>
      <p className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
        {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Agotado'}
      </p>

      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        Agregar al carrito
      </button>

      {showConfirmation && (
        <div className="add-confirmation">
          Producto agregado al carrito ✅
        </div>
      )}

      {showImageFullscreen && (
        <div className="fullscreen-overlay" onClick={() => setShowImageFullscreen(false)}>
          <img
            src={product.image}
            alt={product.name}
            className="fullscreen-image"
          />
        </div>
      )}

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>También te puede interesar</h2>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="related-item"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>S/. {item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
