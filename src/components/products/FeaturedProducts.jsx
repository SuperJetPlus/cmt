import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import InventoryContext from '../../context/InventoryContext';

const FeaturedProducts = () => {
  const { inventory } = useContext(InventoryContext);

  const topProducts = Object.entries(inventory)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="featured-products-grid">
      {topProducts.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default FeaturedProducts;
