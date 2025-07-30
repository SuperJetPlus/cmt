import React from 'react';

const InventoryTable = ({ inventory, onEdit, onUpdateStock }) => {
  return (
    <div className="inventory-table">
      <table>
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Variante</th>
            <th>Stock Actual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(([productId, variants]) => (
            Object.entries(variants).map(([variantId, stock]) => (
              <tr key={`${productId}-${variantId}`}>
                <td>{productId}</td>
                <td>{variantId}</td>
                <td>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => onUpdateStock(productId, variantId, parseInt(e.target.value))}
                    min="0"
                  />
                </td>
                <td>
                  <button onClick={() => onEdit({ id: productId, variantId })}>
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
