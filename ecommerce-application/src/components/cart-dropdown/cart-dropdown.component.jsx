import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem}/>))
                    ) : ( 
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }   
            </CartItems>
            <Button buttonType='inverted' onClick={goToCheckOutHandler}>Go to Checkout</Button>
        </CartDropDownContainer>
    )
}

export default CartDropdown;