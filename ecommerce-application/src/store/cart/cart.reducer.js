import { createSlice } from "@reduxjs/toolkit"

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

  const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
  
    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
  
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };
  
  const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
        addItemToCart: (state, action) => {
            console.log('Payload:', action.payload);
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart: (state, action) => {
            state.cartItems = clearCartItem(state.cartItems, action.payload);
        },
        setIsCartOpen: (state, action) => {
            state.isCartOpen = action.payload;
        }
    }
})

export const { addItemToCart, removeItemFromCart, clearItemFromCart, setIsCartOpen } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;



//Old Reducer Code, not using Redux ToolKit, for comparison

// cart.type.js
// export const CART_ACTION_TYPES = {
//     SET_IS_CART_OPEN: 'cart/SET_IS_CART_OPEN',
//     SET_CART_ITEMS: 'cart/SET_CART_ITEMS',
//   };

// cart.action.js
// import { createAction } from "../../utils/reducer/reducer.utils";
// import { CART_ACTION_TYPES } from "./cart.types";

// const addCartItem = (cartItems, productToAdd) => {
//     // Check if the product already exists in the cart
//     const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

//     // If it exists, increment the quantity and total price
//     if (existingCartItem) {
//         return cartItems.map(cartItem =>
//             cartItem.id === productToAdd.id ? 
//             { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: cartItem.totalPrice + cartItem.price } : cartItem
//         );
//     }
//     // If it doesn't exist, add the product with a quantity of 1
//     return [...cartItems, { ...productToAdd, quantity: 1, totalPrice: productToAdd.price }];
// };

// // Create a helper function to remove an item from the cart
// const removeCartItem = (cartItems, productToRemove) => {
//     // Find the product to remove in the cart
//     const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

//     // If the item exists and its quantity is 1, remove it from the cart
//     if (existingCartItem.quantity === 1) {
//         return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
//     }

//     // Otherwise, decrement the quantity and update the total price
//     return cartItems.map(cartItem => 
//         cartItem.id === productToRemove.id
//             ? { ...cartItem, quantity: cartItem.quantity - 1, totalPrice: cartItem.totalPrice - cartItem.price }
//             : cartItem
//     );
// };

// const clearCartItem = (cartItems, productToClear) => {
//     return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
// }


// export const addItemToCart = (cartItems, productToAdd) => {
//     const newCartItems = addCartItem(cartItems, productToAdd);
//     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
// }

// export const removeItemFromCart = (cartItems, productToRemove) => {
//     const newCartItems = removeCartItem(cartItems, productToRemove);
//     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
// }

// export const clearItemFromCart = (cartItems, productToClear) => {
//     const newCartItems = clearCartItem(cartItems, productToClear);
//     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
// } 

// export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);


// cart.reducer.js
// export const cartReducerOld = (state = CART_INITIAL_STATE, action) => {
//     const {type, payload} = action;

//     switch(type) {
//         case CART_ACTION_TYPES.SET_CART_ITEMS:
//             return {
//                 ...state,
//                 cartItems: payload
//             }
//         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//             return {
//                 ...state,
//                 isCartOpen: payload
//             }
//         default:
//             return state;
//     }
// }