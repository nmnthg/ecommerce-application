import { takeLatest, all, call, put } from 'redux-saga/effects'; // Import necessary effects from redux-saga
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'; // Import the function to fetch categories from Firebase
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action'; // Import actions to handle success and failure
import { CATEGORIES_ACTION_TYPES } from './category.types'; // Import action types

// Generator function to handle the fetch operation
export function* fetchCategoriesAsync() {
    try {
        // Call the function to fetch categories from Firebase and wait for it to complete
        const categoryArray = yield call(getCategoriesAndDocuments, 'categories');
        
        // Dispatch the success action with the fetched categories
        yield put(fetchCategoriesSuccess(categoryArray));
    } catch (error) {
        // If there is an error, dispatch the failure action with the error
        yield put(fetchCategoriesFailed(error));
    }
}

// Watcher saga that listens for specific actions
export function* onFetchCategories() {
    // Listen for FETCH_CATEGORIES_START action and run fetchCategoriesAsync when this action is dispatched
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

// Root saga to combine all sagas
export function* categoriesSaga() {
    // Run all sagas concurrently. Here, it runs onFetchCategories saga
    yield all([call(onFetchCategories)]);
}
