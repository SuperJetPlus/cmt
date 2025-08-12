import React, { createContext, useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from '../firebase/firebase';

// Exportamos el contexto nombrado y default para flexibilidad
export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  // Cambié el estado a array
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const inventoryCollection = collection(db, "inventory");
    const unsubscribe = onSnapshot(inventoryCollection, (snapshot) => {
      const inventoryData = [];
      snapshot.forEach(docSnap => {
        inventoryData.push({ id: docSnap.id, ...docSnap.data() });
      });
      setInventory(inventoryData);
      setLoading(false);
    }, (error) => {
      console.error("Error loading inventory:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateProduct = async (productId, updatedData) => {
    try {
      const productRef = doc(db, "inventory", productId);
      await updateDoc(productRef, updatedData);
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const updateStock = async (productId, newQuantity) => {
    try {
      const productRef = doc(db, "inventory", productId);
      await updateDoc(productRef, {
        stock: newQuantity
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      throw error;
    }
  };

  const addProduct = async (productData) => {
    try {
      const inventoryCollection = collection(db, "inventory");
      await addDoc(inventoryCollection, productData);
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const productRef = doc(db, "inventory", productId);
      await deleteDoc(productRef);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  return (
    <InventoryContext.Provider value={{
      inventory,
      loading,
      updateStock,
      addProduct,
      deleteProduct,
      updateProduct,
      setInventory,
      setLoading
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;
