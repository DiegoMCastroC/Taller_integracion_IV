import React, { useState, useRef, useEffect } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, View, Alert, Text, Button } from 'react-native';

export function CodigoQR ({navigation}: {navigation: any}) {
  const [qrData, setQrData] = useState<string | null>(null);
  const qrScannerRef = useRef<QRCodeScanner | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };

  const onSuccess = (e: any) => {
    const data = e.data;
    setQrData(data); // Capturar el mensaje del código QR

    // Verificar si el código QR es un enlace de producto válido
    if (data.startsWith('https://flask-ta4.onrender.com/productos/')) {
      // Extraer el _id del enlace
      const productId = data.split('/').pop();
      // Navegar al componente ProductDetails con el productId
      navigation.navigate('ProductDetails', { productId });
      // Reiniciar el estado del lector después de redirigirte
      qrScannerRef.current?.reactivate();
    } else {
      Alert.alert('Código QR leído', data);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reiniciar el estado del lector cuando la pantalla vuelve a estar enfocada
      qrScannerRef.current?.reactivate();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.ContenedorMain}>
      {qrData && (
        <View style={styles.ContenedorQR}>
          <Text style={styles.TextoQR}>Código QR leído:</Text>
          <Text style={styles.TextoQR}>{qrData}</Text>
        </View>
      )}
      <Button
        title={flashEnabled ? 'Apagar Flash' : 'Encender Flash'}
        onPress={toggleFlash}
      />
      {/* Lector de códigos QR */}
      <QRCodeScanner
        ref={(node) => {
          qrScannerRef.current = node;
        }}
        onRead={onSuccess}
        flashMode={flashEnabled ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}  // Habilitar el flash para captar mejor el código QR
        topContent={
          <View>
            <Text>Scanner código QR</Text>
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