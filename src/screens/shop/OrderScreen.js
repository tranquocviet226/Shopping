import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import MarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../contants/Colors';

import OrderItem from '../../components/shop/OrderItem';

import {useSelector, useDispatch} from 'react-redux';
import * as orderAction from '../../store/actions/order';

function OrderScreen({navigation}) {
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
  });

  const orders = useSelector(state => state.order.orders);
  const dispatch = useDispatch();

  const [isOrder, setIsOrder] = useState(false);

  useEffect(() => {
    setIsOrder(false);
    dispatch(orderAction.fetchOrder()).then(() => {
      setIsOrder(true);
    });
  }, [dispatch]);

  if (!isOrder) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (orders.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No orders found! Maybe start add some?</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={itemData => (
        <OrderItem
          totalAmount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default OrderScreen;

const styles = StyleSheet.create({});
