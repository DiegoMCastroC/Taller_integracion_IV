import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet
  } from 'react-native';
import { getProduct } from '../services/ProductsService.js';
import { CartContext } from './Cart.js';

export function ProductDetails({route}) {
  const { productId } = route.params;
  const [product, setProduct] = useState({});

  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      const product = await getProduct(productId);
      setProduct(product);
    }

    fetchProduct();
  }, [productId]);

  function onAddToCart() {
    addItemToCart(product._id);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.infoContainer}>
          <Image style={styles.image} source={{ uri: product.url }} />
          <Text style={styles.name}>{product.nombre}</Text>
          <Text style={styles.price}>$ {product.costo}</Text>
          <Text style={styles.description}>Marca: {product.marca}</Text>
          <Text style={styles.description}>Genero: {product.genero}</Text>
          <Text style={styles.description}>Talla: {product.talla}</Text>
          <Text style={styles.description}>Color: {product.color}</Text>
            <Button
            onPress={onAddToCart}
            title="Add to cart"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'black',
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    alignSelf: 'center',
  },
});