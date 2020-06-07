import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
  BackHandler,
  Alert,
} from 'react-native';
import MarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../contants/Colors';

import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartAction from '../../store/actions/cart';
import * as productAction from '../../store/actions/product';
import {Button} from 'react-native-elements';

function ProductOverviewScreen({navigation}) {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity>
        <MarIcon
          name="menu"
          size={25}
          color={Colors.primaryColor}
          onPress={() => navigation.openDrawer()}
          style={{paddingLeft: 10}}
        />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity>
        <MarIcon
          name="cart-plus"
          color={Colors.primaryColor}
          size={25}
          style={{paddingRight: 10}}
          onPress={() => navigation.navigate('Cart')}
        />
      </TouchableOpacity>
    ),
  });
  // BackHandler
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  const [err, setErr] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadProduct = useCallback(async () => {
    //Khi an try again se load lai vi err set = null
    setErr(null);
    setIsRefreshing(true);
    
    try {
      await dispatch(productAction.fetchProducts());
    } catch (error) {
      setErr(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setErr]);

  useEffect(() => {
    const willFocusSub = navigation.addListener(
      'focus',
      loadProduct
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProduct]);

  useEffect(() => {
    setIsLoading(true);
    loadProduct().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProduct]);

  if (err) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: Colors.primaryColor}}>We have an error!</Text>
        <Button
          type="clear"
          title="Try again!"
          color={Colors.primaryColor}
          onPress={() => loadProduct()}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: Colors.primaryColor}}>
          No products found. Maybe start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProduct}
      refreshing={isRefreshing}
      data={products}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onViewDetail={() => {
            navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => {
            dispatch(cartAction.addToCart(itemData.item));
          }}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}
export default ProductOverviewScreen;

const styles = StyleSheet.create({});
