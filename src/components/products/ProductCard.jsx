import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, price, stock, image, rating } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < roundedRating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return (
      <div className="product-rating">
        {stars}
        <span className="rating-value">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div
      className="product-card horizontal"
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      tabIndex={0}
      role="button"
      style={{ cursor: 'pointer' }}
    >
      <img src={image} alt={name} className="product-card-image horizontal-img" />
      <div className="product-card-details">
        <h3 className="product-card-name">{name}</h3>
        {renderStars()}
        <p className="product-card-price">Precio: S/. {price.toFixed(2)}</p>
        <p className={`product-stock ${stock === 0 ? 'out-of-stock' : ''}`}>
          {stock > 0 ? 'En stock' : 'Agotado'}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
