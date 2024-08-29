import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
} 

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);