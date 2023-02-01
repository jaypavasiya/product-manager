const initialState = {
    productData: [],
    SearchedProductData: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_PRODUCT":
            return { ...state, productData: [...state.productData, action.payload] };
        case "EDIT_PRODUCT":
            var index = state.productData.findIndex(_ => _.id === action.payload.id);
            if (index !== -1) {
                state.productData[index] = action.payload;
            }
            return { ...state, productData: state.productData };
        case "DELETE_PRODUCT":
            var productData = state.productData.filter(_ => !action.payload.includes(_.id));
            return { ...state, productData: productData };
        case "SEARCH_PRODUCT":
            let productCopy = JSON.parse(JSON.stringify(state.productData))
            var SearchedProductData = productCopy.filter(_ => _.name.toLowerCase().includes(action.payload.toLowerCase()) || _.category.toLowerCase().includes(action.payload.toLowerCase()));
            return { ...state, SearchedProductData: SearchedProductData };
        default:
            return state;
    }
}

export default rootReducer;
