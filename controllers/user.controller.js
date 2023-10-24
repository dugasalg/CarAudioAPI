const User = require("../models/user.models").User;

async function registrarUsuario(req, res){
	const nombreUsuario = req.body.usrn;
	const pass = req.body.password;

	try {
		const newUser = await new User({
			username:nombreUsuario,
			password: pass
		}).save();

		res.json({
			obj: newUser
		})
	} catch (err) {
		console.log(err);
	}
}

async function iniciarSesion(req, res) {
  const nombreUsuario = req.body.usrn;
  const pass = req.body.password;

  try {
    const usuario = await User.findOne({ username: nombreUsuario, password: pass });

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


module.exports = {
	registrarUsuario, iniciarSesion, getPedidosByUsuario
}
