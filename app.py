from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin

uri = "mongodb+srv://benja:123@bananashop.tzmfwsy.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client.bananashop  # Reemplaza 'bananashop' con el nombre de tu base de datos
users_collection = db.users

app = Flask(__name__)
login_manager = LoginManager(app)

# Configura Flask-Login
app.secret_key = 'papaya'

# Modelo de usuario personalizado
class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

def conbd():
    if client is None:
        return {'message': 'Error al conectar a la base de datos'}, 500

# Cargar el usuario
@login_manager.user_loader
def load_user(user_id):
    user_data = users_collection.find_one({'_id': user_id})
    return User(user_data['_id']) if user_data else None

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    correo = data['correo']
    password = data['contra']
    conbd()

    user = users_collection.find_one({'correo': correo})
    if user and check_password_hash(user['contra'], password):
        user_obj = User(user['_id'])
        login_user(user_obj)
        return jsonify({'message': 'Inicio de sesión exitoso'})
    else:
        return jsonify({'message': 'Inicio de sesión fallido'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
