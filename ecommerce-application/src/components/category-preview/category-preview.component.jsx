import ProductCard from '../product-card/product-card.component';
import { Preview, Title, CategoryPreviewContainer } from './category-preview.styles';

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title}</Title>
            </h2>
            <Preview>
                {  
                    products
                    .filter((_, idx) => idx < 4) //filter out the first 4 element in the category array
                    .map((product) => 
                    <ProductCard key={product.id} product={product}/>) 
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;