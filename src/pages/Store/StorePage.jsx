import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductGrid from '../../components/products/ProductGrid';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import InventoryContext from '../../context/InventoryContext';
import './StorePage.css';

const StorePage = () => {
  const { inventory, loading } = useContext(InventoryContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    inStock: false
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      const productsArray = Object.entries(inventory).map(([id, product]) => ({
        id,
        ...product
      }));
      setProducts(productsArray);
    }
  }, [inventory, loading]);

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !filters.category || product.category === filters.category;

    const matchesPrice = !filters.priceRange || (
      (filters.priceRange === 'under50' && product.price < 50) ||
      (filters.priceRange === '50to100' && product.price >= 50 && product.price <= 100) ||
      (filters.priceRange === 'over100' && product.price > 100)
    );

    const matchesStock = !filters.inStock || product.stock > 0;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      inStock: false
    });
    setSearchTerm('');
  };

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Cargando productos..." />;
  }

  // Obtener categorías únicas desde los productos
  const availableCategories = [...new Set(products.map(p => p.category))];

  return (
    <div className="store-page">
      <div className="store-header">
        <h1>Nuestros Productos</h1>
      </div>

      <div className="store-content">
        <div className="filters-desktop">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            categories={availableCategories}
          />
        </div>

        <button
          className="mobile-filter-button"
          onClick={() => setShowMobileFilters(true)}
        >
          <FiFilter /> Filtros
        </button>

        <main className="product-section">
          <div className="results-bar">
            <div className="results-info">
              <p>
                Mostrando {filteredProducts.length} de {products.length} productos
                {(searchTerm || filters.category || filters.priceRange || filters.inStock) && (
                  <button onClick={clearFilters} className="clear-filters">
                    <FiX /> Limpiar filtros
                  </button>
                )}
              </p>
            </div>
            <div className="input-container">
              <input
                placeholder="Buscar productos..."
                className="input"
                name="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar productos"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                <path d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" />
              </svg>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <ProductGrid
              products={filteredProducts}
              onProductClick={handleProductClick}
              interactive={true}
            />
          ) : (
            <div className="no-results">
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar tus filtros de búsqueda</p>
              <button onClick={clearFilters}>Limpiar todos los filtros</button>
            </div>
          )}
        </main>
      </div>

      {showMobileFilters && (
        <div className="mobile-filters-overlay">
          <div className="mobile-filters-content">
            <div className="mobile-filters-header">
              <h3>Filtros</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                aria-label="Cerrar filtros"
              >
                <FiX />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
              categories={availableCategories}
            />
            <button
              className="apply-filters"
              onClick={() => setShowMobileFilters(false)}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterSidebar = ({ filters, setFilters, clearFilters, categories }) => {
  return (
    <div className="filter-sidebar">
      <h3>Filtrar por</h3>

      <div className="filter-group">
        <h4>Categoría</h4>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <h4>Rango de precios</h4>
        <div className="price-options">
          <label>
            <input
              type="radio"
              name="priceRange"
              checked={filters.priceRange === 'under50'}
              onChange={() => setFilters({ ...filters, priceRange: 'under50' })}
            />
            Menos de S/. 50
          </label>
          <label>
            <input
              type="radio"
              name="priceRange"
              checked={filters.priceRange === '50to100'}
              onChange={() => setFilters({ ...filters, priceRange: '50to100' })}
            />
            S/. 50 - S/. 100
          </label>
          <label>
            <input
              type="radio"
              name="priceRange"
              checked={filters.priceRange === 'over100'}
              onChange={() => setFilters({ ...filters, priceRange: 'over100' })}
            />
            Más de S/. 100
          </label>
        </div>
      </div>

      <div className="filter-group">
        <label className="stock-filter">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
          />
          Mostrar solo productos en stock
        </label>
      </div>

      <button onClick={clearFilters} className="clear-filters-button">
        Limpiar filtros
      </button>
    </div>
  );
};

export default StorePage;
