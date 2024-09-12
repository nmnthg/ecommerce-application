import { useDispatch, useSelector } from 'react-redux';
import { clearItemFromCart, addItemToCart, removeItemFromCart } from '../../store/cart/cart.reducer';
import { selectCartItems } from '../../store/cart/cart.selector';
import { ImageContainer, Quantity, RemoveButton, CheckoutItemContainer } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const {name, imageUrl, quantity, totalPrice} = cartItem;
    
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <span className='name'>{name}</span>
            <Quantity>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </Quantity>
            <span className='price'>{totalPrice}</span>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;