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

module.exports = {
	registrarUsuario, iniciarSesion
}
