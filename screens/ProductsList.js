import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Product } from '../components/Product';
import { getProducts } from '../services/ProductsService.js';
import Footer from '../components/footer';

export function ProductsList ({navigation}) {
  function renderProduct({item: product}) {
    return (
      <Product {...product} 
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product.id,
        });
      }}
      />
    );
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        keyExtractor={(item) => item.id.toString()}
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
});