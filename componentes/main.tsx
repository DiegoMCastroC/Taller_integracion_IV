import React, { useState, useRef } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';


export const Main = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const qrScannerRef = useRef<QRCodeScanner | null>(null);

  const onSuccess = (e: any) => {
    // Manejar el código QR leído aquí
    const data = e.data;
    setQrData(data); // se capta el mensaje del codigo qr
    Alert.alert('Código QR leído', data);
  };

  return (
    <View style={styles.ContenedorMain}>
      {qrData && (
        <View style={styles.ContenedorQR}>
          <Text style={styles.TextoQR}>Código QR leído:</Text>
          <Text style={styles.TextoQR}>{qrData}</Text>
        </View>
      )}

      {/* Lector de códigos QR */}
      <QRCodeScanner
        ref={(node) => {
          qrScannerRef.current = node;
        }}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}  //Se habilita el flash, para captar mejor el codigo qr
        topContent={
          <View>
            <Text>Scanner codigo QR</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ContenedorMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Camara: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    padding: 10,
  },
  ContenedorQR: {
    marginTop: 20,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  TextoQR: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Main;
