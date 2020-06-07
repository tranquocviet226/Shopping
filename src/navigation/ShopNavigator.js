import React from 'react';
import Colors from '../contants/Colors';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

const ProductNavigator = createStackNavigator();
function ProductDrawerScreen() {
  return (
    <ProductNavigator.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Colors.primaryColor,
      }}>
      <ProductNavigator.Screen
        name="ProductOverview"
        component={ProductOverviewScreen}
        options={{title: 'All Product'}}
      />
      <ProductNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({route}) => ({title: route.params.productTitle})}
      />
      {/* <ProductNavigator.Screen name="Order" component={OrderScreen} /> */}
      <ProductNavigator.Screen name="Cart" component={CartScreen} />
    </ProductNavigator.Navigator>
  );
}

const StackOrder = createStackNavigator();
function OrderStack() {
  return (
    <StackOrder.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Colors.primaryColor,
      }}>
      <StackOrder.Screen name="Order" component={OrderScreen} />
    </StackOrder.Navigator>
  );
}

const StackAdmin = createStackNavigator();
function UserProductDrawer() {
  return (
    <StackAdmin.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Colors.primaryColor,
      }}>
      <StackAdmin.Screen name="Admin" component={UserProductScreen} />
      <StackAdmin.Screen name="Edit" component={EditProductScreen} />
    </StackAdmin.Navigator>
  );
}

const AuthStack = createStackNavigator();
function AuthNavigator() {
  return <NavigationContainer>
    <AuthStack.Navigator mode='modal' headerMode='none'>
      <AuthStack.Screen name='Startup' component={StartupScreen}/>
      <AuthStack.Screen name='Auth' component={AuthScreen}/>
      <AuthStack.Screen name='Shop' component={ShopNavigator}/>
    </AuthStack.Navigator>
  </NavigationContainer>;
}
const DrawerNavigator = createDrawerNavigator();
function ShopNavigator() {
  return (
    <DrawerNavigator.Navigator>
      <DrawerNavigator.Screen name="Product" component={ProductDrawerScreen} />
      <DrawerNavigator.Screen
        name="Order"
        component={OrderStack}
        options={{title: 'Order'}}
      />
      <DrawerNavigator.Screen
        name="UserProduct"
        component={UserProductDrawer}
        options={{title: 'Admin'}}
      />
    </DrawerNavigator.Navigator>
  );
}

export default AuthNavigator;
