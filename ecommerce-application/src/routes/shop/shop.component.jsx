import ProductCard from '../../components/product-card/product-card.component';
import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context'
import './shop.styles.scss';

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {/* Iterate over the keys of the categoriesMap object, returning an 
                array of category titles. Then we map over that array (going over all
                the products in each), for each product render a ProductCard component */
                Object.keys(categoriesMap).map((title) => (
                    <Fragment key={title}>
                        <h2>{title}</h2>
                        <div className='products-container'>
                            {categoriesMap[title].map((product) => ( 
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </Fragment>
                ))
            }
        </Fragment>
    );
}

export default Shop;