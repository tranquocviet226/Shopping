import React, {useReducer, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import MarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../contants/Colors';

import {useSelector, useDispatch} from 'react-redux';
import * as productAction from '../../store/actions/product';

const FORM_INPUT_REDUCER = 'FORM_INPUT_REDUCER';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_REDUCER) {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValidate = {
      ...state.inputValidate,
      [action.input]: action.isValid,
    };
    let updateformIsValid = true;
    for (const key in updateValidate) {
      updateformIsValid = updateformIsValid && updateValidate[key];
    }
    return {
      formIsValid: updateformIsValid,
      inputValidate: updateValidate,
      inputValues: updateValues,
    };
  }
  return state;
};

function EditProductScreen({route, navigation}) {
  navigation.setOptions({
    headerRight: () => (
      <TouchableNativeFeedback>
        <MarIcon
          name="check"
          size={25}
          color={Colors.primaryColor}
          onPress={() => {
            submitHandler();
          }}
          style={{paddingRight: 10}}
        />
      </TouchableNativeFeedback>
    ),
  });
  const dispatch = useDispatch();

  const {productId} = route.params;
  const editProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === productId),
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : '',
      imageUrl: editProduct ? editProduct.imageUrl : '',
      description: editProduct ? editProduct.description : '',
      price: '',
    },
    inputValidate: {
      title: editProduct ? true : false,
      imageUrl: editProduct ? true : false,
      description: editProduct ? true : false,
      price: editProduct ? true : false,
    },
    formIsValid: editProduct ? true : false,
  });

  const inputHandler = (inputIdentify, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_REDUCER,
      value: text,
      isValid: isValid,
      input: inputIdentify,
    });
  };

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editProduct) {
        await dispatch(
          productAction.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
          ),
        );
      } else {
        await dispatch(
          productAction.createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            +formState.inputValues.price,
          ),
        );
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        {
          text: 'Okay',
        },
      ]);
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          value={formState.inputValues.title}
          onChangeText={inputHandler.bind(this, 'title')}
        />
      </View>
      {!formState.inputValidate.title && (
        <Text style={styles.err}>Please enter a valid title!</Text>
      )}
      {editProduct ? null : (
        <View style={styles.content}>
          <Text style={styles.text}>Price</Text>
          <TextInput
            value={formState.inputValues.price}
            onChangeText={inputHandler.bind(this, 'price')}
            keyboardType="decimal-pad"
          />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.text}>Description</Text>
        <TextInput
          value={formState.inputValues.description}
          onChangeText={inputHandler.bind(this, 'description')}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Image Url</Text>
        <TextInput
          value={formState.inputValues.imageUrl}
          onChangeText={inputHandler.bind(this, 'imageUrl')}
        />
      </View>
    </View>
  );
}

export default EditProductScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  text: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  err: {
    color: 'red',
    paddingHorizontal: 20,
  },
});
