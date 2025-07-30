import { useState, useEffect } from 'react';
import useInventory from './useInventory';

const useCart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { inventory, updateStock } = useInventory();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    const productInInventory = inventory.find((p) => p.id === product.id);
    const availableStock = productInInventory ? productInInventory.stock : 0;

    if (currentQuantity >= availableStock) {
      alert('No hay más stock disponible.');
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const finalizePurchase = () => {
    cart.forEach((item) => {
      updateStock(item.id, item.quantity);
    });
    clearCart();
    alert('¡Compra realizada con éxito!');
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    finalizePurchase,
    inventory,
  };
};

export default useCart;
