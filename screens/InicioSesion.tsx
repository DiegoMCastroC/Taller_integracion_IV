import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación
import fondo from '../assets/4.png';
import RegisterScreen from './Register';

const LoginScreen = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { setIsAuthenticated } = useContext(AuthContext); // Accede al estado de autenticación global
  const [mostrarRegister, setMostrarRegister] = useState(false); 

  const handleLogin = async () => {
    if (correo === '' || password === '') {
      setIsAuthenticated(true);
      navigation.navigate('Products');
      Alert.alert('Error', 'Por favor, completa los campos.');
    } else {
      try {
        const response = await fetch('https://flask-ta4.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ correo, contrasena: password })
        });
  
        const result = await response.json();
  
        if (response.ok) {
          Alert.alert('Éxito', result.message);
          setIsAuthenticated(true);
          navigation.navigate('Products');
        } else {
          Alert.alert('Error', result.message);
        }
      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    }
  };

  if (mostrarRegister) {
    return <RegisterScreen />;
  }

  const handleRegistroClick = async () => {
    setMostrarRegister(true);
  };

  return (
    <ImageBackground source={fondo} style={styles.background}>
      <View style={[styles.container]}>
        <Text style={[styles.title1, { marginTop: 280 }]}>Inicio de sesion</Text>
        <Text style={[styles.title2,{ marginTop: 30 }]}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electronico"
          onChangeText={(text) => setCorreo(text)}
          value={correo}
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
        <Text style={[styles.title3, { marginTop: 10 }]}>
          ¿No tienes una cuenta?{' '}
          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={handleRegistroClick}
          >
            Registrate
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
    color:'black',
  },
});

export default LoginScreen;
