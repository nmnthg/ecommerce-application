import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
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