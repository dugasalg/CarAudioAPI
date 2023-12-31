const { product } = require('../models/products.model');

// Create - Agregar un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Read - Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Update - Actualizar un producto por ID
exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Delete - Eliminar un producto por ID
exports.deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await product.findByIdAndRemove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

// Controlador para obtener productos por categoría
exports.getProductsByCategory = async (req, res) =>{
  const { categoria } = req.params;
  try {
    // Consulta la base de datos para encontrar productos por categoría
    const products = await product.find({ category: categoria });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos por categoría' });
  }
};

exports.getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const productFound = await product.findById(id);
    if (!productFound) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    res.status(200).json(productFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};
