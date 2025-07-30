import { useState, useEffect } from 'react';
import initialProducts from '../data/mockProducts';

const INVENTORY_KEY = 'inventory';
const INVENTORY_VERSION_KEY = 'inventory_version';

const generateVersion = (products) => {
  // Crea una versión simple basada en los IDs concatenados
  return products.map((p) => p.id).sort().join(',');
};

const useInventory = () => {
  const initialVersion = generateVersion(initialProducts);
  const savedVersion = localStorage.getItem(INVENTORY_VERSION_KEY);
  const savedInventory = localStorage.getItem(INVENTORY_KEY);

  const shouldResetInventory = !savedVersion || savedVersion !== initialVersion;

  const [inventory, setInventory] = useState(() => {
    if (shouldResetInventory) {
      localStorage.setItem(INVENTORY_VERSION_KEY, initialVersion);
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return savedInventory ? JSON.parse(savedInventory) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
  }, [inventory]);

  const updateStock = (productId, quantitySold) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, stock: item.stock - quantitySold }
          : item
      )
    );
  };

  const resetInventory = () => {
    const version = generateVersion(initialProducts);
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(initialProducts));
    localStorage.setItem(INVENTORY_VERSION_KEY, version);
    setInventory(initialProducts);
  };

  return {
    inventory,
    updateStock,
    resetInventory,
  };
};

export default useInventory;
