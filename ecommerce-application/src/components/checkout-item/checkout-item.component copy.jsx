import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import { ImageContainer, Quantity, RemoveButton, CheckoutItemContainer } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, quantity, totalPrice} = cartItem;
    
    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);

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