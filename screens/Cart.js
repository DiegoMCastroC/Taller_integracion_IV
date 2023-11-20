import React, { createContext, useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert} from 'react-native';
import { getProduct } from '../services/ProductsService.js';


export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  async function addItemToCart(_id) {
    const product = await getProduct(_id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => item._id == _id);
      if (!item) {
        return [...prevItems, {
          _id,
          qty: 1,
          product,
          totalPrice: parseFloat(product.costo)
        }];
      } else {
        return prevItems.map((item) => {
          if (item._id == _id) {
            item.qty++;
            item.totalPrice += parseFloat(product.costo);
          }
          return item;
        });
      }
    });
  }

  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  return (
    <CartContext.Provider value={{ items, setItems, getItemsCount, addItemToCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function CartIcon({navigation}) {
  const {getItemsCount} = useContext(CartContext);
  return (
    <View style={styles.container}>
      <Text style={styles.text} 
        onPress={() => {
          navigation.navigate('Cart');
        }}
      >Cart ({getItemsCount()})</Text>
    </View>
  );
}

export function Cart({ navigation }) {
  const { items, getItemsCount, getTotalPrice, setItems } = useContext(CartContext);

  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    });
    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>$ {total}</Text>
      </View>
    );
  }

  function renderItem({ item }) {
    function eliminarProducto(_id) {
      setItems((prevItems) => {
        return prevItems.map((product) => {
          if (product._id === _id) {
            if (product.qty > 1) {
              const newQty = product.qty - 1;
              const newTotalPrice = (product.totalPrice/product.qty)*newQty;
              return { ...product, qty: newQty, totalPrice: newTotalPrice};
            } else if (product.qty === 1) {
              return { ...product, qty: 0, totalPrice: 0 };
            }
          }
          return product;
        }).filter((product) => product.qty > 0);
      });
    }

    return (
      <View style={styles.cartLine}>
        <Text style={styles.lineLeft}>{item.product.nombre} x {item.qty}</Text>
        <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
        <Button title="Eliminar" onPress={() => eliminarProducto(item._id)} />
      </View>
    );
  }

  function Comprar() {
    Alert.alert('Error', 'En construccion, lamentamos las molestias')
  }

  return (
    <View>
      <CartIcon navigation={navigation} />
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.product._id}
        ListFooterComponent={Totals}
      />
      <Button
            onPress={Comprar}
            title="Comprar"
            />
    </View>
  );
}

// ... estilos ...
const styles = StyleSheet.create({
  cartLine: { 
    flexDirection: 'row',
  },
  cartLineTotal: { 
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  lineTotal: {
    fontWeight: 'bold',    
  },
  lineLeft: {
    fontSize: 20, 
    lineHeight: 40, 
    color:'#333333' 
  },
  lineRight: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: 'bold',
    lineHeight: 40, 
    color:'#333333', 
    textAlign:'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  container: {
    marginHorizontal: 8,
    backgroundColor: 'orange',
    height: 32,
    padding: 20,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    height: 20,
  },
});