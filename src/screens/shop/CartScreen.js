import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import Colors from '../../contants/Colors';

import CartItem from '../../components/shop/CartItem';
import * as CartAction from '../../store/actions/cart';
import * as OrderAction from '../../store/actions/order';
import {useSelector, useDispatch} from 'react-redux';

function CartScreen({navigation}) {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

  const cartItem = useSelector(state => {
    const transformCartItems = [];
    for (const key in state.cart.items) {
      transformCartItems.push({
        productId: key,
        quantity: state.cart.items[key].quantity,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        sum: state.cart.items[key].sum,
        imageUrl: state.cart.items[key].imageUrl,
      });
    }
    return transformCartItems.sort((a, b) =>
      a.productId > b.productId ? -1 : 1,
    );
  });
  const dispatch = useDispatch();

  const [isOrder, setIsOrder] = useState(false);
  const orderHandler = async () => {
    setIsOrder(true);
    await dispatch(OrderAction.addOrder(cartItem, cartTotalAmount));
    setIsOrder(false);
  };

  return (
    <View style={styles.screen}>
      {isOrder ? (
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor}
          style={{justifyContent: 'center'}}
        />
      ) : null}
      <View style={styles.summary}>
        <Text style={styles.summayText}>
          Total:
          <Text style={styles.totalAmount}> ${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          type="clear"
          titleStyle={{color: Colors.accenteColor2}}
          disabled={cartItem.length === 0}
          onPress={orderHandler}
        />
      </View>
      <FlatList
        data={cartItem}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            price={itemData.item.productPrice}
            amount={itemData.item.sum}
            imageUrl={itemData.item.imageUrl}
            onRemove={() => {
              dispatch(CartAction.removeCart(itemData.item.productId));
            }}
          />
        )}
        keyExtractor={item => item.productId}
      />
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: 5,
  },
  summayText: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  totalAmount: {
    fontWeight: 'bold',
    color: Colors.accentColor,
  },
});
