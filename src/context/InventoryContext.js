import React, { createContext, useState, useEffect } from 'react';
import { fetchInventory } from '../api/inventory';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(true);

  const updateStock = (productId, variantId, quantity) => {
    setInventory(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [variantId]: prev[productId][variantId] - quantity
      }
    }));
  };

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await fetchInventory();
        setInventory(data);
      } catch (error) {
        console.error("Error loading inventory:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInventory();
  }, []);

  return (
    <InventoryContext.Provider value={{ inventory, loading, updateStock }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;
