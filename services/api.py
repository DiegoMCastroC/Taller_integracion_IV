from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Conexión a MongoDB
client = MongoClient("mongodb+srv://benja:123@bananashop.tzmfwsy.mongodb.net/bananashop")
db = client.bananashop

# Modelo para la colección 'productos'
class Product:
    def __init__(self, _id, nombre, precio):
        self._id = str(_id)
        self.nombre = nombre
        self.precio = precio

# Ruta para obtener la lista de productos
@app.route('/productos', methods=['GET'])
def get_productos():
    productos = db.productos.find()
    product_list = [Product(product['_id'], product['nombre'], product['precio']) for product in productos]
    return jsonify([product.__dict__ for product in product_list])

# Ruta para obtener los detalles de un producto por ID
@app.route('/productos/<string:_id>', methods=['GET'])
def get_producto(_id):
    producto = db.productos.find_one({'_id': _id})
    if producto:
        return jsonify(Product(producto['_id'], producto['nombre'], producto['precio']).__dict__)
    else:
        return jsonify({'message': 'Producto no encontrado'}), 404

# Modelo para la colección 'users'
class User:
    def __init__(self, _id, nombre, correo, telefono, contrasena):
        self._id = _id
        self.nombre = nombre
        self.correo = correo
        self.telefono = telefono
        self.contrasena = contrasena

# Ruta para el registro de usuarios
@app.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    nombre = data['nombre']
    correo = data['correo']
    telefono = data['telefono']
    contrasena = data['contrasena']

    # Encripta la contraseña
    contrasena_encriptada = generate_password_hash(contrasena, method='sha256')

    # Crea un nuevo usuario
    usuario = User(None, nombre, correo, telefono, contrasena_encriptada)

    # Guarda el usuario en la base de datos
    db.users.insert_one(usuario.__dict__)

    return jsonify({'message': 'Usuario registrado exitosamente'})

# Ruta para el inicio de sesión de usuarios
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data['correo']
    contrasena = data['contrasena']

    # Busca el usuario en la base de datos por correo electrónico
    usuario = db.users.find_one({'correo': correo})

    if usuario and check_password_hash(usuario['contrasena'], contrasena):
        return jsonify({'message': 'Inicio de sesión exitoso'})
    else:
        return jsonify({'message': 'Inicio de sesión fallido'}), 401

# Ruta para la página de inicio
@app.route('/')
def index():
    return 'Página de inicio'

if __name__ == '__main__':
    app.run(port=3000)
