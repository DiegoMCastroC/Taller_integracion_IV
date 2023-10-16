import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class Footer extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.footer}>
        <Button
          title="Productos"
          onPress={() => {
            navigation.navigate('ProductList');
          }}
        />
        <Button
          title="Codigo QR"
          onPress={() => {
            navigation.navigate('CodigoQR');
          }}
        />
        <Button
          title="Mi cuenta"
          onPress={() => {
            navigation.navigate('Account');
          }}
        />
      </View>
    );
  }
}

const styles = {
    footer: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      backgroundColor: "#fff",
      height: 50,
      paddingHorizontal: 10, // Añade esta línea
    },
    link: {
      color: "#000",
      fontSize: 14,
    },
  };

export default Footer;