import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import './categories-preview.styles.scss';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

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