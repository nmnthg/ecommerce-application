import { ReactComponent as CartIconPic } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
    return (
        <div className='cart-icon-container'>
            <CartIconPic className='cart-icon'/>
            <span className='item-count'>0</span>
        </div>
    );
}

export default CartIcon;