import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchInventory = async () => {
  const inventoryCollection = collection(db, "inventory");
  const snapshot = await getDocs(inventoryCollection);

  let inventoryData = {};
  snapshot.forEach(docSnap => {
    const productData = docSnap.data();
    inventoryData[docSnap.id] = productData.variants || {};
  });

  return inventoryData;
};

export const updateInventory = async (productId, variantId, newQuantity) => {
  const productRef = doc(db, "inventory", productId);
  await updateDoc(productRef, {
    [`variants.${variantId}`]: newQuantity
  });
};
