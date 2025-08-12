import React, { useState, useContext } from "react";
import InventoryContext from "../../context/InventoryContext";
import { uploadImage as uploadImageToCloudinary } from "../../firebase/uploadToCloudinary";

const AddProductForm = ({ onProductAdded }) => {
    const { addProduct } = useContext(InventoryContext);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: null,
        rating: "",
        description: "",
        category: "",
        stock: 0,
    });

    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                image: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert("El nombre es obligatorio.");
            return;
        }

        if (formData.price === "" || Number(formData.price) < 0) {
            alert("El precio debe ser un número positivo.");
            return;
        }

        setUploading(true);

        let imageURL = "";

        try {
            if (formData.image) {
                console.log("Archivo imagen a subir:", formData.image);
                const { url } = await uploadImageToCloudinary(formData.image);
                imageURL = url;
            }

            const productToAdd = {
                name: formData.name.trim(),
                price: parseFloat(formData.price),
                image: imageURL,
                rating: parseFloat(formData.rating) || 0,
                description: formData.description.trim(),
                category: formData.category.trim(),
                stock: parseInt(formData.stock, 10) || 0,
            };

            await addProduct(productToAdd);

            if (onProductAdded) onProductAdded();

            setFormData({
                name: "",
                price: "",
                image: null,
                rating: "",
                description: "",
                category: "",
                stock: 0,
            });
        } catch (error) {
            console.error("Error agregando producto:", error);
            alert("Error al agregar el producto: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <h3 className="form-title">Agregar Nuevo Producto</h3>

            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nombre del producto"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Precio:</label>
                <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 29.99"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="image">Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="form-input-file"
                />
            </div>

            <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="Ej: 4.5"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripción del producto"
                    className="form-textarea"
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">Categoría:</label>
                <input
                    id="category"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Ej: Ropa"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="stock">Stock inicial:</label>
                <input
                    id="stock"
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
            </div>

            <button type="submit" disabled={uploading} className="submit-btn">
                {uploading ? "Subiendo..." : "Agregar Producto"}
            </button>
        </form>
    );
};

export default AddProductForm;
