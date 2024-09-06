import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category]);

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading ? 
                <Spinner/> : 
                (
                <div className='category-container'>
                    {  
                        /* Check if products is not undefined first since we are 
                        destructuring it from categoriesMap which needs to be fetched */   
                        products && products.map((product) => {
                            return (<ProductCard key={product.id} product={product}/>);
                        })  
                    }
                </div>
                )
            }
        </Fragment>
    )
};

export default Category;