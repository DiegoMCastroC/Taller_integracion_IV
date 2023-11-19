import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';

import fondo from '../assets/4.png';
import LoginScreen from './InicioSesion';

const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rut, setRUT] = useState('');
  const [mostrarLogin, setMostrarLogin] = useState(false); // Estado para controlar si se muestra Main

  const handleRegistro = () => {
    // Valida los datos de entrada
    if (!nombre || !correo || !telefono || !contrasena) {
      return;
    }

    // Guarda los datos del usuario en la base de datos
    guardarDatosUsuario();
  };

  const handleIniciarSesion = () => {
    setMostrarLogin(true);
  };

  if (mostrarLogin) {
    return <LoginScreen />;
  }

  const guardarDatosUsuario = async () => {
    // Aquí va el código para guardar los datos del usuario en la base de datos
    // Obtiene los datos del usuario
    const nombreG = nombre;
    const correoG = correo;
    const telefonoG = telefono;
    const contrasenaG = contrasena;


    // Crea el documento JSON para guardar en la base de datos
    const documento = {
      nombre,
      correo,
      telefono,
      contrasena,
      rut,
    };

    // Envía los datos del usuario al backend
    await fetch('https://flask-ta4.onrender.com/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documento),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== 'Usuario registrado exitosamente') {
          // Ocurrió un error
          Alert.alert('Error', 'Error al registrar usuario')
        } else {
          // Ocurrió un error
          Alert.alert('Success', 'Se ha registrado correctamente')
          handleIniciarSesion();
        }
      });
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.container}>
      <Text style={[styles.title1, { marginTop: 210 }]}>Registro</Text>
        <Text style={[styles.title4]}>Nombre y apellido</Text>
        <TextInput style={styles.input} placeholder="Nombre y apellido" onChangeText={(text) => setNombre(text)} />
        <Text style={[styles.title4]}>Correo electrónico</Text>
        <TextInput style={styles.input} placeholder="Correo Electrónico" onChangeText={(text) => setCorreo(text)} />
        <Text style={[styles.title4]}>Número de teléfono</Text>
        <TextInput style={styles.input} placeholder="Número de Teléfono" keyboardType="phone-pad" onChangeText={(text) => setTelefono(text)} />
        <Text style={[styles.title4]}>Contraseña</Text>
        <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry onChangeText={(text) => setContrasena(text)} />
        <Text style={[styles.title4]}>Rut sin guion</Text>
        <TextInput style={styles.input} placeholder="rut" keyboardType="phone-pad" onChangeText={(text) => setRUT(text)} />

        <Button title="Registrarse" onPress={handleRegistro} />
        <Text style={[styles.title4, { marginTop: 10 }]}>¿Ya tienes una cuenta?{' '}
          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={handleIniciarSesion}
          >
            Iniciar Sesion
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title1: {
    fontSize: 30,
    marginBottom: 16,
    color: 'white',
  },
  title4: {
    fontSize: 15,
    marginBottom: 16,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
    backgroundColor: 'white',
    textAlign: 'center',
  },
});

export default RegisterScreen;