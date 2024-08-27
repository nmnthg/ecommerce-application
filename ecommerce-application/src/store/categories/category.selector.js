import { createSelector } from "reselect";

const selectCategorySlice = (state) => state.categories; //select the category slice of 

const selectCategories = createSelector( 
    [selectCategorySlice],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
        categories.reduce((acc, category) => {
        const {title, items} = category;
        acc[title.toLowerCase()]= items;
        return acc;
    }, {})
);