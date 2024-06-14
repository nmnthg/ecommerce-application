import { ReactComponent as CartIconPic } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <div className='cart-icon-container'>
            <CartIconPic onClick={toggleIsCartOpen} className='cart-icon'/>
            <span className='item-count'>0</span>
        </div>
    );
}

export default CartIcon;