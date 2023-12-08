const { router } = require("../app");
const { route } = require("../routes");
const jwt = require('jsonwebtoken');

const {config} = require('../config/config');


const User = require("../models/user.models").User;
const {Carrito} = require('../models/carrito.model');

async function registrarUsuario(req, res) {
  const nombreUsuario = req.body.usrn;
  const pass = req.body.password;
  const fechaNacimiento = req.body.birthDate; // Agregado
  const domicilio = req.body.address;     // Agregado
  
  try {
      const newUser = await new User({
          username: nombreUsuario,
          password: pass,
          birthDate: fechaNacimiento,   // Agregado
          address: domicilio,          // Agregado
          carritos: []
      }).save();

        res.status(201).json({ mensaje: 'Usuario creado', usuarioId: newUser._id });
    } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}



async function loginUsuario(req,res){
  const nombreUsuario = req.body.usrn;
  const pass = req.body.password;

  console.log(nombreUsuario);
  console.log(pass);

  try{
      const user = await User.findOne({username: nombreUsuario});
      console.log(user);
      
      if(user && user.password == pass){
          console.log("entro")

          try{
              const nuevoToken = await jwt.sign(
                  {username: nombreUsuario},
                  config.auth.secretKey,
                  {algorithm:'HS256'}
                  );
      
                  res.status(200).json({
                      message: "Login exitoso",
                      jwt: nuevoToken
                  })
       
          }catch(err){
              console.log(err)
              res.status(500).json({
                  
                  message: "Error de autenticacion",
                  jwt: ""


              })
          }
      
      }else{
          res.status(401).json({
                  
              message: "Contraseña Incorrecta",
              jwt: ""
          })
      }


  }catch(err){
      console.log(err)
  }
}

async function editarUsuario(req, res) {
  const { userID } = req.params;
  const { username, password, birthDate, address } = req.body;

  try {
      const updatedUser = await User.findByIdAndUpdate(
          userID,
          { username, password, birthDate, address },
          { new: true }
      );
      if (!updatedUser) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({
          message: 'Usuario actualizado correctamente',
          usuario: updatedUser
      });
  } catch (err) {
      console.log(err);
      res.status(500).json({
          message: 'Error al actualizar el usuario',
      });
  }
}



// En user.controller.js

async function agregarCarritoPorId(req, res) {
    try {
      // Obtener el ID del usuario de los parámetros de la ruta
      const { idUsuario } = req.params;
  
      // Obtener el ID del carrito del cuerpo de la solicitud
      const { carritoId } = req.body;
  
      // Verificar si el usuario existe
      const usuario = await User.findById(idUsuario);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Verificar si el carrito existe
      const carrito = await Carrito.findById(carritoId);
      if (!carrito) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      // Agregar el carrito al usuario
      usuario.carritos.push(carrito);
  
      // Guardar el usuario actualizado
      const usuarioActualizado = await usuario.save();
  
      res.status(201).json({
        mensaje: 'Carrito agregado al usuario',
        usuario: usuarioActualizado,
      });
    } catch (error) {
      console.error('Error al agregar el carrito al usuario', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  


module.exports = {registrarUsuario, loginUsuario, agregarCarritoPorId, editarUsuario}
