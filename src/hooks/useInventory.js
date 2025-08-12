import { useState, useEffect } from 'react';
import { collection, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInventory(products);
        setLoading(false);
      },
      (error) => {
        console.error('Error al obtener productos de Firestore:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateStock = async (productId, quantitySold) => {
    try {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === productId
            ? { ...item, stock: item.stock - quantitySold }
            : item
        )
      );

      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        stock: (inventory.find(p => p.id === productId)?.stock || 0) - quantitySold,
      });
    } catch (error) {
      console.error('Error actualizando stock en Firestore:', error);
      // Opcional: revertir estado local o mostrar error al usuario
    }
  };

  // Resetea inventario a un estado "inicial" si quieres: aquí puedes definirlo
  // Por simplicidad, dejamos vacío o haces un reset local o mediante función aparte.
  const resetInventory = () => {
    // Opcional: implementa reset en Firestore si tienes un estado inicial definido
    // Por ejemplo, reescribir la colección con productos iniciales.
    console.warn('resetInventory no está implementado para Firestore');
  };

  return {
    inventory,
    loading,
    updateStock,
    resetInventory,
  };
};

export default useInventory;
