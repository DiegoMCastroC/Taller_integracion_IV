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
import { LoginScreen } from '../componentes/index'; // Importa el componente LoginScreen si es necesario

const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarLogin, setMostrarLogin] = useState(false); // Estado para controlar si se muestra la pantalla de inicio de sesión

  const handleRegistro = () => {
    if (!nombre || !correo || !telefono || !contrasena) {
      return;
    }

    // Realizar registro de usuario (puedes agregar la lógica de registro aquí)

    Alert.alert('Success', 'Se ha registrado correctamente');
  };

  const handleIniciarSesion = () => {
    setMostrarLogin(true); // Cambia el estado para mostrar la pantalla de inicio de sesión
  };

  if (mostrarLogin) {
    return <LoginScreen />;
  }

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.title1, { marginTop: 260 }]}>Registro</Text>
        <Text style={[styles.title4]}>Nombre y apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre y apellido"
          onChangeText={(text) => setNombre(text)}
        />
        <Text style={[styles.title4]}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={(text) => setCorreo(text)}
        />
        <Text style={[styles.title4]}>Número de teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de Teléfono"
          keyboardType="phone-pad"
          onChangeText={(text) => setTelefono(text)}
        />
        <Text style={[styles.title4]}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => setContrasena(text)}
        />
        <Button title="Registrarse" onPress={handleIniciarSesion} />
        <Text style={[styles.title4, { marginTop: 10 }]}>
          ¿Ya tienes una cuenta?{' '}
          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={handleIniciarSesion}
          >
            Inicia Sesión
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
    fontSize: 40,
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
