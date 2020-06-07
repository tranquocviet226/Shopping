import React, {useReducer, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements';

import {useDispatch} from 'react-redux';
import * as AuthAction from '../../store/actions/auth';
import Colors from '../../contants/Colors';

const W = Dimensions.get('window').width;
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

function AuthScreen({navigation}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputHandler = (inputIdentify, text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (!emailRegex.test(formState.inputValues.email.toLowerCase())) {
      isValid = false;
    }
    if (text.trim().length < 6) {
      isValid = false;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentify,
    });
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const [isSwitch, setIsSwitch] = useState(true);
  const singupHandler = async () => {
    let action;
    if (isSwitch) {
      //Login
      action = AuthAction.login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      //Sign up
      action = AuthAction.signup(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      navigation.navigate('Shop');
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      style={styles.screen}
      {...Platform.OS === 'ios' && {behavior: 'padding'}}>
      <View
        style={{
          width: 2 * W,
          height: 2 * W,
          borderRadius: W,
          backgroundColor: '#e64f9a',
          position: 'absolute',
          top: (-W * 4) / 3,
        }}
      />
      <Image
        source={require('../../../assets/images/logo.png')}
        style={{width: 200, height: 170, resizeMode: 'contain'}}
      />

      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              letterSpacing: 2,
              color: 'gray',
            }}>
            SHOPPING
          </Text>
          <View style={{justifyContent: 'flex-end'}}>
            <View style={styles.inputContainer}>
              <Text style={styles.email}>Email</Text>
              <TextInput
                style={styles.inputUser}
                value={formState.inputValues.email}
                onChangeText={inputHandler.bind(this, 'email')}
              />
              {!formState.inputValidities.email && (
                <Text style={styles.error}>Please enter a valid email</Text>
              )}
              <Text style={styles.pass}>Password</Text>
              <TextInput
                style={styles.inputPass}
                value={formState.inputValues.password}
                onChangeText={inputHandler.bind(this, 'password')}
                secureTextEntry={true}
              />
              {!formState.inputValidities.password && (
                <Text style={styles.error}>Please enter a valid password</Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <Button
                  loading
                  type="clear"
                  title="Loading"
                  titleStyle={{color: Colors.primaryColor}}
                  containerStyle={styles.buttonStyle}
                />
              ) : (
                <Button
                  type="clear"
                  title={isSwitch ? 'Login' : 'Sign Up'}
                  titleStyle={{color: '#FFF'}}
                  containerStyle={styles.buttonStyle}
                  onPress={() => singupHandler()}
                />
              )}

              <Button
                type="clear"
                title={isSwitch ? 'Sign Up' : 'Back'}
                titleStyle={{color: '#FFF'}}
                containerStyle={styles.buttonStyle}
                onPress={() => setIsSwitch(prevState => !prevState)}
              />
            </View>
          </View>
          <View />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eff3f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 20,
    width: '80%',
    maxHeight: 400,
    justifyContent: 'center',
    borderRadius: 10,
  },
  inputContainer: {
    marginTop: 10,
  },
  inputUser: {
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 3,
    width: '100%',
  },
  inputPass: {
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 3,
    width: '100%',
  },
  email: {
    fontWeight: 'bold',
  },
  pass: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: '#e74f9c',
    width: '100%',
    margin: 5,
  },
});
