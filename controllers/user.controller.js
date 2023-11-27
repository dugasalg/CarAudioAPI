const { router } = require("../app");
const { route } = require("../routes");
const jwt = require('jsonwebtoken');

const {config} = require('../config/config');


const User = require("../models/user.models").User;

async function registrarUsuario(req, res) {
  const nombreUsuario = req.body.usrn;
  const pass = req.body.password;
  const fechaNacimiento = req.body.birthDate; // Agregado
  const domicilio = req.body.address;     // Agregado

  if (nombreUsuario === null|| pass === null || fechaNacimiento === null || domicilio === null){
    return res.status(400).json({mensaje: "Todos los campos son obligatorios"})
  }

  try {
      const newUser = await new User({
          username: nombreUsuario,
          password: pass,
          birthDate: fechaNacimiento,   // Agregado
          address: domicilio            // Agregado
      }).save();

      res.json({
            message: "Usuario registrado correctamente",
          obj: newUser
      });
  } catch (err) {
      console.log(err);
      res.status(500).json({
                  
        message: "Error de autenticacion",
        obj: {}
      });
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

module.exports = {registrarUsuario, loginUsuario}