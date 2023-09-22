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

import fondo from './assets/4.png';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username == '' || password == '') {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    } else {
      Alert.alert('Éxito', 'Has iniciado sesión correctamente.');
    }
  };

  return (

     <ImageBackground source={fondo} style={styles.background}>
      <View style={[styles.container]}>
      <Text style={[styles.title1, { marginTop: 280 },]}>Inicio de sesion</Text>

        <Text style={[styles.title2,{ marginTop: 30 }]}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electronico"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={styles.title2}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button title="Iniciar Sesión" onPress={handleLogin} />
        <Text style={[styles.title3, { marginTop: 30 }]}>¿No tienes una cuenta? Registrate</Text>
        <Text style={styles.title3}>Olvide mi contraseña</Text>
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
  title2: {
    fontSize: 24,
    marginBottom: 16,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title3: {
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

export default LoginScreen;
