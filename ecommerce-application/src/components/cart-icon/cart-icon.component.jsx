import { ReactComponent as CartIconPic } from '../../assets/shopping-bag.svg';
import { CartIconContainer, ItemCount } from './cart-icon.styles';
import { useSelector } from 'react-redux';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.reducer';
import {useDispatch} from 'react-redux';

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartTotalItems = useSelector(selectCartCount);

    const toggleIsCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }

    return (
        <CartIconContainer>
            <CartIconPic onClick={toggleIsCartOpen} className='cart-icon'/>
            <ItemCount>{cartTotalItems}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;