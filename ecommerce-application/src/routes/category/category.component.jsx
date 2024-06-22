import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <div className='category-container'>
            {
                /* Check if products is not undefined first since we are 
                destructuring it from categoriesMap which needs to be fetched */   
                products && products.map((product) => {
                    console.log(product.id);
                    return (<ProductCard key={product.id} product={product}/>);
                })  
            }
        </div>
    )

}

export default Category;