import { createContext, useState, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

// Create a helper function to add an item to the cart
const addCartItem = (cartItems, productToAdd) => {
    // Check if the product already exists in the cart
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    // If it exists, increment the quantity and total price
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id ? 
            { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: cartItem.totalPrice + cartItem.price } : cartItem
        );
    }
    // If it doesn't exist, add the product with a quantity of 1
    return [...cartItems, { ...productToAdd, quantity: 1, totalPrice: productToAdd.price }];
};

// Create a helper function to remove an item from the cart
const removeCartItem = (cartItems, productToRemove) => {
    // Find the product to remove in the cart
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    // If the item exists and its quantity is 1, remove it from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    // Otherwise, decrement the quantity and update the total price
    return cartItems.map(cartItem => 
        cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1, totalPrice: cartItem.totalPrice - cartItem.price }
            : cartItem
    );
};

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
}

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
  };

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartTotalItems: 0,
    cartTotalPrice: 0
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
});

export const CartProvider = ({children}) => {
    const [ {cartItems, isCartOpen, cartTotalItems, cartTotalPrice}, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

   
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemReducer(newCartItems);
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        updateCartItemReducer(newCartItems);
    } 

    const setIsCartOpen = (bool) => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool});
    }


    const updateCartItemReducer = (cartItems) => {
        const newCartTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        const newCartTotalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
        
        const payload = {
            cartItems,
            cartCount: newCartTotalItems,
            cartTotal: newCartTotalPrice,
          };
      
          dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    };

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartTotalItems, cartTotalPrice};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
