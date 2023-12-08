const mongoose = require('mongoose');
const { Carrito } = require('../models/carrito.model'); 
const { product } = require('../models/products.model'); // Importa el modelo de Producto

// Resto de tus controladores existentes...

// Agregar producto al documento por ID
// Agregar producto al carrito por ID de carrito y producto
exports.agregarProductoAlCarrito = async (req, res) => {
  try {
    const { carritoId, productoId } = req.body; // Recibe el ID del carrito y el ID del producto desde el frontend

    // Primero, verifica si el producto existe
    const producto = await product.findById(productoId);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Luego, busca el carrito en la base de datos por su ID
    const carrito = await Carrito.findById(carritoId);

    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Agrega el producto al carrito
    carrito.productos.push(producto);

    // Guarda el carrito actualizado en la base de datos
    const carritoActualizado = await carrito.save();

    res.status(201).json({ mensaje: 'Producto agregado al carrito', carrito: carritoActualizado });
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un carrito vacío y obtener su ID
exports.crearCarrito = async (req, res) => {
  try {
    const nuevoCarrito = new Carrito({
      productos: [],
    });

    const resultado = await nuevoCarrito.save();

    res.status(201).json({ mensaje: 'Carrito creado', carritoId: resultado._id });
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//Recuperar un carrito por medio de ID
exports.getCarritobyId = async(req, res) => {
  const {id} = req.params;
  try{
    const carrito = await Carrito.findById(id);
    res.status(200).json(carrito);
  } catch (error){
    res.status(500).json({error: 'Error al obtener carrito'});
  }
};

exports.deleteProductoById = async(req, res) => {
  const {idProducto} = req.params
  try{
    if(!idProducto){
      return res.status(404).json({error: "no se encontro el producto"})
    }
    await product.findByIdAndRemove(idProducto);
    res.status(204).send()
  } catch (error){
    res.status(500).json({error: "Error al eliminar producto"});
  }
};