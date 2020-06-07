import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, TouchableOpacity, FlatList, View, Text} from 'react-native';
import MarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../contants/Colors';
import {useNavigation} from '@react-navigation/native'

import UserProductItem from '../../components/shop/UserProductItem';
import * as productAction from '../../store/actions/product';

function UserProductScreen({navigation}) {
  const navigationOp = useNavigation();
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
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity >
          <MarIcon
            name="logout"
            size={25}
            color={Colors.primaryColor}
            style={{marginHorizontal: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit', {
              productId: '',
            })
          }>
          <MarIcon
            name="plus-circle"
            size={25}
            color={Colors.primaryColor}
            style={{paddingRight: 10}}
          />
        </TouchableOpacity>
      </View>
    ),
  });

  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  if (userProducts.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No products found! Maybe start create some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={itemData => (
        <UserProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onDelete={() => {
            dispatch(productAction.deleteProduct(itemData.item.id));
          }}
          onEdit={() =>
            navigation.navigate('Edit', {
              productId: itemData.item.id,
            })
          }
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default UserProductScreen;

const styles = StyleSheet.create({});
