import { createContext, useState, useEffect } from "react";

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


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    setCartItems: () => {},
    cartTotal: 0,
    setCartTotal: () => {},
    clearItemFromCart: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalItems, setCartTotalItems] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(prevCartItems => addCartItem(prevCartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(prevCartItems => removeCartItem(prevCartItems, productToRemove));
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(prevCartItems => clearCartItem(prevCartItems, productToClear));
    } 

    useEffect(() => {
        const newCartTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartTotalItems(newCartTotalItems);
    }, [cartItems]) //Every time cartItems change, update total items

    useEffect(() => {
        const newCartTotalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
        setCartTotalPrice(newCartTotalPrice);
    }, [cartItems]) //Every time cartItems change, update total price 

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartTotalItems, cartTotalPrice};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


