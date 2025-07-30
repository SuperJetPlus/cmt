import React, { useState } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    sku: '',
    variants: [{
      id: '',
      attributes: {},
      stock: 0
    }]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="product-form-modal">
      <form onSubmit={handleSubmit}>
        <h3>{product.id ? 'Editar Producto' : 'Nuevo Producto'}</h3>
        
        <label>
          Nombre:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </label>

        {/* Más campos del formulario */}

        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancelar</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
