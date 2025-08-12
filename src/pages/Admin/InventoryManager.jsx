import React, { useContext, useState } from "react";
import InventoryContext from "../../context/InventoryContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import AddProductForm from "../../components/admin/AddProductForm";
import "./InventoryManager.css";

const InventoryManager = () => {
  const { inventory, loading, deleteProduct, updateProduct } =
    useContext(InventoryContext);

  const [savingId, setSavingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  if (loading) return <LoadingSpinner />;

  if (!loading && Object.keys(inventory).length === 0) {
    return (
      <div className="inventory-manager">
        <h2>Gestor de Inventario</h2>
        <button
          onClick={() => setShowAddProduct(true)}
          className="add-product-btn"
        >
          Agregar Nuevo Producto
        </button>

        {showAddProduct && (
          <div
            className="modal-overlay"
            onClick={() => setShowAddProduct(false)}
          >
            <div
              className="modal-content edit-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setShowAddProduct(false)}
                aria-label="Cerrar modal"
              >
                ×
              </button>
              <AddProductForm onProductAdded={() => setShowAddProduct(false)} />
            </div>
          </div>
        )}

        <p>No hay productos en el inventario. Usa el panel para agregar productos.</p>
      </div>
    );
  }

  // Manejar cambios en campos de edición
  const handleChange = (productId, field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], [field]: value },
    }));
  };

  // Guardar producto editado
  const handleSave = async (productId) => {
    if (!editValues[productId]) return;

    const updatedData = {
      ...inventory[productId],
      ...editValues[productId],
    };

    updatedData.price = parseFloat(updatedData.price) || 0;
    updatedData.rating = parseFloat(updatedData.rating) || 0;
    updatedData.stock = parseInt(updatedData.stock, 10) || 0;

    try {
      setSavingId(productId);
      await updateProduct(productId, updatedData);

      // Limpiar estado de edición
      setEditValues((prev) => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
      setEditingProduct(null);
    } catch (error) {
      console.error("Error actualizando producto:", error);
      alert("Error al guardar los cambios");
    } finally {
      setSavingId(null);
    }
  };

  // Eliminar producto
  const handleDelete = async (productId) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      setSavingId(productId);
      await deleteProduct(productId);
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Error al eliminar el producto");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="inventory-manager">
      <h2>Gestor de Inventario</h2>

      <button
        onClick={() => setShowAddProduct(true)}
        className="add-product-btn"
      >
        Agregar Nuevo Producto
      </button>

      {/* Modal: Agregar Producto */}
      {showAddProduct && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddProduct(false)}
        >
          <div
            className="modal-content edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowAddProduct(false)}
              aria-label="Cerrar modal"
            >
              ×
            </button>
            <AddProductForm onProductAdded={() => setShowAddProduct(false)} />
          </div>
        </div>
      )}

      {/* Grid de productos */}
      <div className="product-grid">
        {Object.entries(inventory).map(([productId, product]) => (
          <div key={productId} className="product-card">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            )}
            <h3>{product.name}</h3>
            <p className="price">S/. {product.price?.toFixed(2)}</p>
            <p className="stock">Stock: {product.stock}</p>
            <div className="card-actions">
              <button onClick={() => setEditingProduct(productId)}>Editar</button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(productId)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Editar Producto */}
      {editingProduct && (
        <div
          className="modal-overlay"
          onClick={() => setEditingProduct(null)}
        >
          <div
            className="modal-content edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setEditingProduct(null)}
              aria-label="Cerrar modal"
            >
              ×
            </button>
            <h3>Editar Producto</h3>

            {["name", "price", "rating", "category", "description", "stock"].map(
              (field) => (
                <div className="form-group" key={field}>
                  <label htmlFor={`${field}-${editingProduct}`}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  {field === "description" ? (
                    <textarea
                      id={`${field}-${editingProduct}`}
                      value={
                        editValues[editingProduct]?.[field] ??
                        inventory[editingProduct][field]
                      }
                      onChange={(e) =>
                        handleChange(editingProduct, field, e.target.value)
                      }
                      className="form-textarea"
                    />
                  ) : (
                    <input
                      id={`${field}-${editingProduct}`}
                      type={["price", "rating", "stock"].includes(field) ? "number" : "text"}
                      value={
                        editValues[editingProduct]?.[field] ??
                        inventory[editingProduct][field]
                      }
                      onChange={(e) =>
                        handleChange(editingProduct, field, e.target.value)
                      }
                      step={field === "price" ? "0.01" : "0.1"}
                      min={["price", "rating", "stock"].includes(field) ? "0" : undefined}
                      max={field === "rating" ? "5" : undefined}
                      className="form-input"
                    />
                  )}
                </div>
              )
            )}

            <button
              className="save-btn"
              onClick={() => handleSave(editingProduct)}
              disabled={savingId === editingProduct}
            >
              {savingId === editingProduct ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManager;