import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductItem = props => {
  return (
    <View style={styles.product}>
      <View style={{width: '100%', height: '85%'}}>
        <TouchableOpacity onPress={props.onViewDetail}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <Image source={{uri: props.imageUrl}} style={styles.image} />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{props.price.toFixed(2)}$</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.action}>
        <View style={styles.button} onPressIn={props.onViewDetail}>
          <Button
            title="Detail"
            raised
            titleStyle={{
              fontFamily: 'VNI-Disney',
            }}
            buttonStyle={{
              backgroundColor: '#C2185B',
              width: '100%',
            }}
            onPress={props.onViewDetail}
          />
        </View>
        <View style={styles.button}>
          <Button
            icon={<Icon name="cart-plus" size={15} color="white" />}
            raised
            title="Cart"
            titleStyle={{
              fontFamily: 'VNI-Disney',
            }}
            buttonStyle={{
              backgroundColor: '#C2185B',
              width: '100%',
            }}
            onPress={props.onAddToCart}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    flex: 1,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 20,
    height: 300,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    height: '20%',
    // backgroundColor: 'pink',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginVertical: 5,
    fontFamily: 'VNI-Briquet',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    alignSelf: 'center',
  },
  priceContainer: {
    height: '10%',
    // backgroundColor: 'pink',
    // justifyContent: 'center',
  },
  price: {
    color: '#888',
    textAlign: 'center',
  },
  action: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    height: '15%',
    paddingBottom: 10
    // position: 'absolute',
    // bottom: -18,
  },
  button: {
    width: 100,
    justifyContent: 'center',
  },
});
