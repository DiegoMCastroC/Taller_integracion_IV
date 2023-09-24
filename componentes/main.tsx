import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import App from '../App';


export const Main = () => {

  const [mostrarLogin, setMostrarLogin] = useState(false); 

  const handleRegistro = () => {

    if (true) {
      setMostrarLogin(true);
    }
  };

  if (mostrarLogin) {
    return <App/>;
  }
  return (
    
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Button title="Volver al principio" onPress={handleRegistro} />
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Main;