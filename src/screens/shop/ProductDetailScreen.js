import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Colors from '../../contants/Colors';

import * as cartReducer from '../../store/actions/cart'

function ProductDetailScreen({route, navigation}) {
  const {productId} = route.params;
  
  const availableProducts = useSelector(
    state => state.products.availableProducts,
  );

  const displayProducts = availableProducts.find(
    product => product.id === productId,
  );

  const dispatch = useDispatch();
  
  return (
    <View style={styles.screen}>
      <Image source={{uri: displayProducts.imageUrl}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{displayProducts.title}</Text>
        <Text style={styles.price}>{displayProducts.price}$</Text>
        <Text style={styles.description}>{displayProducts.description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: displayProducts.imageUrl}}
          style={styles.imageCon}
        />
        <Image
          source={{uri: displayProducts.imageUrl}}
          style={styles.imageCon}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Add to cart"
          raised
          containerStyle={{width: 100, alignSelf: 'center', marginVertical: 10}}
          buttonStyle={{backgroundColor: Colors.primaryColor, borderRadius: 10}}
            onPress={() => {
                dispatch(cartReducer.addToCart(displayProducts))
            }}
        />
      </View>
    </View>
  );
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    elevation: 1
  },
  title: {
    fontFamily: 'VNI-Trung Kien',
    fontSize: 20,
    color: Colors.accenteColor2,
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  description: {},
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 5,
    elevation: 1
  },
  imageCon: {
    width: '45%',
    height: 100,
  },
  btnContainer:{
      backgroundColor:'white',
      paddingVertical: 5,
      marginVertical: 5,
      elevation: 1
  }
});
