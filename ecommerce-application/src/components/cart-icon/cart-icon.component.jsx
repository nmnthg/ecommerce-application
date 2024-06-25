import { ReactComponent as CartIconPic } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer, ItemCount } from './cart-icon.styles';


const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartTotalItems} = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer>
            <CartIconPic onClick={toggleIsCartOpen} className='cart-icon'/>
            <ItemCount>{cartTotalItems}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;