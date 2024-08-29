import { createSelector } from "reselect";

const selectCartSlice = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartSlice],
    (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
    [selectCartSlice],
    (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, item) => total + item.quantity, 0
    )
);
  
export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, item) => total + item.totalPrice, 0
    )
);
