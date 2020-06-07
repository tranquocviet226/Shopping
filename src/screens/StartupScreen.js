import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import * as AuthAction from '../store/actions/auth';

function StartupScreen({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        navigation.navigate('Auth');
        return;
      }
      const tranformData = JSON.parse(userData);
      const {token, userId, expiredDate} = tranformData;
      const expirationDate = new Date(expiredDate);

    //   if (expirationDate <= new Date() || !token || !userId) {
    //     navigation.navigate('Auth');
    //     return;
    //   }
      navigation.navigate('Shop');
      dispatch(AuthAction.authenticate(userId, token));
    };
    tryLogin();
  }, [dispatch]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  );
}

export default StartupScreen;

const styles = StyleSheet.create({});
