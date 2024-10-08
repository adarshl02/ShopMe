import * as actionType from "../constants/productConstants";

export const getProductReducer = (
  state = { products: [], loading: false },
  action
) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };

    case actionType.GET_PRODUCTS_SUCCESS:
      return { ...state, products: [...action.payload], loading: false }; //products is an array of objects

    case actionType.GET_PRODUCTS_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
//6_05
export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCT_DETAILS_REQUEST:
      return { loading: true };

    case actionType.GET_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }; //products is an array of objects

    case actionType.GET_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case actionType.GET_PRODUCT_DETAILS_RESET:
      return { product: {} };

    default:
      return state;
  }
};
