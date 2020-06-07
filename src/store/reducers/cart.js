import {ADD_TO_CART} from '../actions/cart';
import {REMOVE_CART} from '../actions/cart';
import {ADD_ORDER} from '../actions/order';
import Cart from '../../models/cart';
import {DELETE_PRODUCT} from '../actions/product';

const initialState = {
  items: {},
  totalAmount: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addProduct = action.product;
      const productPrice = addProduct.price;
      const productTitle = addProduct.title;
      const productImageUrl = addProduct.imageUrl;

      let NewCart;

      if (state.items[addProduct.id]) {
        //Already item in cart
        NewCart = new Cart(
          state.items[addProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addProduct.id].sum + productPrice,
          productImageUrl,
        );
      } else {
        NewCart = new Cart(
          1,
          productPrice,
          productTitle,
          productPrice,
          productImageUrl,
        );
      }
      return {
        ...state,
        items: {...state.items, [addProduct.id]: NewCart},
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_CART:
      const selectCartItem = state.items[action.pid];

      const currentQty = selectCartItem.quantity;
      let Cartitems;

      if (currentQty > 1) {
        const Item = new Cart(
          selectCartItem.quantity - 1,
          selectCartItem.productPrice,
          selectCartItem.productTitle,
          selectCartItem.sum - selectCartItem.productPrice,
          selectCartItem.imageUrl,
        );
        Cartitems = {...state.items, [action.pid]: Item};
      } else {
        Cartitems = {...state.items};
        delete Cartitems[action.pid]; 
      }
      return {
        ...state,
        items: Cartitems,
        totalAmount: state.totalAmount - selectCartItem.productPrice,
      };
    //Khi order xong, clear gio hang
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updateItem = {...state.items};
      const itemTotal = state.items[action.pid].sum;
      delete updateItem[action.pid];
      return {
        ...state,
        items: updateItem,
        totalAmount: state.totalAmount - itemTotal,
      };
  }
  return state;
};
