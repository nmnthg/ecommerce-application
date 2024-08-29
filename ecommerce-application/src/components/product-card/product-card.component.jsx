import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action.js';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import { Footer, ProductCardContainer } from './product-card.styles.jsx';

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const {name, price, imageUrl} = product;
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
 
    return (
        <ProductCardContainer> 
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </ProductCardContainer>
    );
}

export default ProductCard;