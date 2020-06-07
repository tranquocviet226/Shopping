import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import Colors from '../../contants/Colors';
import CartItem from './CartItem';

const OrderItem = props => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.orderItem}>
        <Text style={styles.totalAmount}>$ {props.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        type="clear"
        title={showDetail ? 'Hide detail' : 'Show detail'}
        titleStyle={{color: Colors.primaryColor}}
        containerStyle={{width: 100, alignSelf:'center'}}
        onPress={() => {
          setShowDetail(prevState => !prevState);
        }}
      />
      {showDetail && (
        <View>
          {props.items.map(cartItem => (
            <View style={styles.detailContainer} key={cartItem.productId}>
              <View style={styles.quantityContainer}>
                <Text>{cartItem.quantity}</Text>
              </View>
              <View style={styles.titleContainer}>
                <Text>{cartItem.productTitle}</Text>
              </View>
              <View style={styles.sumContainer}>
                <Text>${cartItem.sum.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  screen: {
    marginVertical: 6,
    marginHorizontal: 20,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  totalAmount: {
    color: Colors.accenteColor2,
    fontWeight: 'bold',
  },
  date: {
    color: 'gray',
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quantityContainer:{
    flex: 1
  },
  titleContainer:{
    flex: 7
  },
  sumContainer:{
    flex: 3
  }
});
