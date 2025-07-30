import React from 'react';
import ProductCard from './ProductCard';
import { featuredProducts } from '../../data/products';

const FeaturedProducts = () => {
  return (
    <div className="featured-products-grid">
      {featuredProducts.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default FeaturedProducts;
