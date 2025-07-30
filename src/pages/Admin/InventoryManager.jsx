import React, { useState, useContext } from 'react';
import { updateInventory } from '../../api/inventory';
import InventoryContext from '../../context/InventoryContext';
import ProductForm from '../../components/admin/ProductForm';
import InventoryTable from '../../components/admin/InventoryTable';
import Notification from '../../components/ui/Notification';

const InventoryManager = () => {
  const { inventory, loading, updateStock } = useContext(InventoryContext);
  const [notification, setNotification] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar productos basados en búsqueda
  const filteredInventory = Object.entries(inventory).filter(([productId, variants]) => {
    return productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
           Object.keys(variants).some(variantId => 
             variantId.toLowerCase().includes(searchTerm.toLowerCase())
           );
  });

  const handleUpdateStock = async (productId, variantId, newStock) => {
    try {
      await updateInventory({
        productId,
        variantId,
        newStock,
        action: 'SET_VALUE'
      });
      
      updateStock(productId, variantId, newStock);
      showNotification('Stock actualizado exitosamente', 'success');
    } catch (error) {
      showNotification('Error al actualizar stock', 'error');
      console.error('Update error:', error);
    }
  };

  const handleAddProduct = (newProduct) => {
    // Lógica para añadir nuevo producto
    console.log('Adding new product:', newProduct);
    showNotification('Producto añadido', 'success');
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) return <div className="loading">Cargando inventario...</div>;

  return (
    <div className="inventory-manager">
      <h2>Gestión de Inventario</h2>
      
      <div className="inventory-controls">
        <input
          type="text"
          placeholder="Buscar producto o variante..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <button 
          onClick={() => setEditingProduct({})}
          className="add-button"
        >
          + Añadir Producto
        </button>
      </div>

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={editingProduct.id ? handleUpdateStock : handleAddProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      <InventoryTable
        inventory={filteredInventory}
        onEdit={(product) => setEditingProduct(product)}
        onUpdateStock={handleUpdateStock}
      />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
};

export default InventoryManager;
