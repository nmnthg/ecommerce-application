import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context'
import './categories-preview.styles.scss';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <div className='shop-container'>
            {/* Iterate over the keys of the categoriesMap object, returning an 
                array of category titles. Then we map over that array (going over all
                the products in each), for each product render a CategoryPreview component */
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products}/>
                })
            }
        </div>
    );
}

export default CategoriesPreview;