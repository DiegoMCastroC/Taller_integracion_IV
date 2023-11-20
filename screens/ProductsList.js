import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getProducts } from '../services/ProductsService.js';
import Footer from '../components/footer';

export function ProductsList ({navigation}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      console.log(products); // Añade esta línea
      setProducts(products);
    }
    fetchProducts();
  }, []);

  function renderProduct({item: product}) {
    return (
      <TouchableOpacity style={styles.product} onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product._id,
        });
      }}>
        <Image style={styles.image} source={{ uri: product.url }} />
        <Text style={styles.productName}>{product.nombre}</Text>
        <Text style={styles.productPrice}>${product.costo}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        keyExtractor={(item) => item._id}
        data={products}
        renderItem={renderProduct}
      />
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  product: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  productName: {
    fontSize: 18,
    color: 'black',
  },
  productPrice: {
    fontSize: 16,
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