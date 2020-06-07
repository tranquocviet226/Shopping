import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    //any async code!
    try {
      const response = await fetch(
        'https://rn-shoppingapp-4e485.firebaseio.com/products.json',
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadProducts = [];

      for (const key in resData) {
        loadProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }

      dispatch({
        type: SET_PRODUCT,
        products: loadProducts,
        userProducts: loadProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (error) {
      // send data
      throw error;
    }
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState)=> {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    //any async code!
    const response = await fetch(
      `https://rn-shoppingapp-4e485.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ownerId: userId,
          title,
          imageUrl,
          description,
          price,
        }),
      },
    );

    if(!response.ok){
      throw new Error('Something wrong!')
    }

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        ownerId: userId,
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shoppingapp-4e485.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );

    if(!response.ok){
      throw new Error('Something wrong!')
    }

    await response.json();

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState)=> {
    const token = getState().auth.token;
    
    const response = await fetch(
      `https://rn-shoppingapp-4e485.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      },
    );

    if(!response.ok){
      throw new Error('Something wrong!')
    }

    // await response.json();
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        imageUrl,
        description,
        // price,
      },
    });
  };
};
