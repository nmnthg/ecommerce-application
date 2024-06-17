import { createContext, useState, useEffect } from "react";

// Create a helper function to add an item to the cart
const addCartItem = (cartItems, productToAdd) => {
    // Check if the product already exists in the cart
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    // If it exists, increment the quantity
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id ? 
            { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
    }

    // If it doesn't exist, add the product with a quantity of 1
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    setCartItems: () => {},
    cartTotal: 0,
    setCartTotal: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(prevCartItems => addCartItem(prevCartItems, productToAdd));
    }

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]) //Every time cartItems change, 

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


