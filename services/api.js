const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

// Especifica el nombre de la base de datos en la cadena de conexión
mongoose.connect('mongodb+srv://benja:123@bananashop.tzmfwsy.mongodb.net/bananashop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((error) => console.error('Error al conectar a la base de datos', error));

// Define un modelo de Mongoose para la colección 'productos'
const Product = mongoose.model('Product', new mongoose.Schema({}, { collection : 'productos' }));

// Ruta para product list
app.get('/productos', async (req, res) => {
  const productos = await Product.find();
  res.json(productos);
});

// Ruta para product details
app.get('/productos/:_id', async (req, res) => {
  if (!req.params._id) {
    return res.status(400).send('Product ID is missing');
  }

  try {
    const producto = await Product.findById(req.params._id);
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener el producto', error);
    res.status(500).send('Error al obtener el producto');
  }
});

// Modelo de usuario para la colección 'users'
const User = mongoose.model('User', new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  contrasena: String
}, { collection: 'users' }));

// Ruta para el registro de usuarios
app.post('/registro', async (req, res) => {
  try {
    const data = req.body;
    const nombre = data.nombre;
    const correo = data.correo;
    const telefono = data.telefono;
    const contrasena = data.contrasena;

    // Encripta la contraseña
    const contrasena_encriptada = await bcrypt.hash(contrasena, 10);

    // Crea un nuevo usuario
    const usuario = new User({
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      contrasena: contrasena_encriptada
    });

    // Guarda el usuario en la base de datos
    await usuario.save();

    res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el usuario', error);
    res.status(500).send('Error al registrar el usuario');
  }
});

// Ruta para el inicio de sesión de usuarios
app.post('/login', async (req, res) => {
  try {
    const data = req.body;
    const correo = data.correo;
    const contrasena = data.contrasena;

    // Busca el usuario en la base de datos por correo electrónico
    const usuario = await User.findOne({ correo: correo });

    if (usuario && await bcrypt.compare(contrasena, usuario.contrasena)) {
      res.json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.json({ message: 'Inicio de sesión fallido' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    res.status(500).send('Error al iniciar sesión');
  }
});

//Ruta pagina de inicio
app.get("/",(req, res) => {
  res.send("pagina Inicio")
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));