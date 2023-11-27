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
          obj: newUser
      });
  } catch (err) {
      console.log(err);
      res.status(500).send('Error al registrar el usuario');
  }
}


async function iniciarSesion(req, res) {
  const nombreUsuario = req.body.usrn;
  const pass = req.body.password;

  console.log(nombreUsuario);
  console.log(pass);

  try {
    const usuario = await User.findOne({ username: nombreUsuario, password: pass });

    console.log(usuario);

    if (!usuario) {
      return res.status(401).json({ mensaje: "Nombre de usuario o contraseña incorrectos" });
    }

    res.json({
      mensaje: "Inicio de sesión exitoso",
      usuario: usuario
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensaje: "Hubo un error al iniciar sesión" });
  }
}

// Controlador para obtener pedidos de un usuario
async function getPedidosByUsuario(req, res) {
  const { usuarioId } = req.params;
  try {
    // Consulta la base de datos para encontrar los pedidos del usuario
    const pedidos = await Pedido.find({ usuario: usuarioId });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos del usuario' });
  }
}


// Controlador para actualizar la información del usuario
async function actualizarUsuario(req, res) {
  const { id } = req.params;
  const { datosActualizados } = req.body;
  
  try { 
    const usuario = await User.findById(id);
    if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    
    //Verifica si el usuario tiene permiso para actualizar esta información (por ejemplo, es el propietario de la cuenta)
    if (usuario.id !== req.user.id) {
    return res.status(403).json({ mensaje: 'No tienes permiso para actualizar esta cuenta' });
    }
    
    //Actualiza la información del usuario
    usuario.nombre = datosActualizados.nombre;
    usuario.username = datosActualizados.username;
    usuario.password = datosActualizados.password;
    
    await usuario.save();
    
    res.status(200).json({ mensaje: 'Información del usuario actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la información del usuario' });
  }
}

// Controlador para eliminar lógicamente la cuenta del usuario
async function eliminarUsuarioLogico(req, res) {
  const { id } = req.params;

  try {
    
    const usuario = await User.findById(id);
    if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    
    // // Verifica si el usuario tiene permiso para eliminar su cuenta
    if (usuario.id !== req.user.id) {
    return res.status(403).json({ mensaje: 'No tienes permiso para eliminar esta cuenta' });
    }
    
    //Marca el usuario como inactivo o establece un estado de eliminación lógica
    usuario.estado = 'inactivo'; 
    
    await usuario.save();
    
    res.status(200).json({ mensaje: 'Cuenta de usuario eliminada lógicamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar lógicamente la cuenta del usuario' });
  }
}



module.exports = {
	registrarUsuario, iniciarSesion, getPedidosByUsuario, actualizarUsuario, eliminarUsuarioLogico
}
