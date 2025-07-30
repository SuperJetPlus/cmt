import React from 'react';
import './ProductGrid.css';

const ProductGrid = ({ products, onProductClick, interactive = false }) => {
  if (!products || products.length === 0) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <div
          key={product.id}
          className={`product-card ${interactive ? 'interactive' : ''}`}
          onClick={() => onProductClick(product.id)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && onProductClick(product.id)}
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">S/. {product.price.toFixed(2)}</p>
            <p className={`product-stock ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
              {product.stock > 0 ? 'En stock' : 'Agotado'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
