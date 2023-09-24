import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import fondo from './assets/4.png';
import LoginScreen from './componentes/InicioSesion';
import RegisterScreen from './componentes/Register';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleLoginButtonClick = () => {
    setCurrentScreen('login');
  };

  const handleMainButtonClick = () => {
    setCurrentScreen('RegisterScreen');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <View style={styles.container}>
            <ImageBackground source={fondo} style={styles.background}>
              <Text style={[styles.title1, { marginTop: 120 }]}>Bienvenido a Bananashop</Text>
              <View style={styles.button}>
              <Button title="Iniciar Sesión" onPress={handleLoginButtonClick}  />
              </View>
              <View style={styles.button2}>
              <Button title="Registrarse" onPress={handleMainButtonClick} />
              </View>
              
            </ImageBackground>
          </View>
        );
      case 'login':
        return <LoginScreen />;
      case 'RegisterScreen':
        return (   
              <RegisterScreen />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title1: {
    fontSize: 40,
    marginBottom: 16,
    color: 'white',
    textAlign: 'center',

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
  button: {
    marginBottom: 30, // Espacio adicional entre los botones
  },
  button2: {
    marginBottom: 40, // Espacio adicional entre los botones
  }
});

export default App;
