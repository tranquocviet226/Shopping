import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MarIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CartItem = props => {
  return (
    <View style={styles.itemData}>
      <View style={styles.image}>
        <Image
          source={{uri: props.imageUrl}}
          style={{height: 70, width: '100%'}}
        />
      </View>
      <View style={styles.title}>
        <Text>{props.title}</Text>
      </View>
      <View style={styles.quantity}>
        <Text>{props.quantity}</Text>
      </View>
      <View style={styles.amount}>
        <Text>{props.amount.toFixed(2)}$</Text>
      </View>
      <View style={styles.icon}>
        <MarIcon name="trash-can-outline" size={20} onPress={props.onRemove} />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  itemData: {
    flex: 1,
    flexDirection: 'row',
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  quantity: {
    flex: 1.5,
  },
  image: {
    flex: 5,
    paddingHorizontal: 5
  },
  title: {
    flex: 7,
    paddingHorizontal: 5
  },
  price: {
    flex: 5,
  },
  amount: {
    flex: 5,
  },
  icon: {
    flex: 1.5,
  },
});
