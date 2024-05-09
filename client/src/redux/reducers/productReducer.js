import * as actionType from "../constants/productConstants";

export const getProductReducer=(state={products:[]},action)=>{

    switch(action.type){

        case actionType.GET_PRODUCTS_SUCCESS: 
            return {products:action.payload};  //products is an array of objects

        case actionType.GET_PRODUCTS_FAIL:
            return {error:action.payload}

        default : 
            return state;
    }
}
//6_05
export const getProductDetailsReducer=(state={product:{}},action)=>{

    switch(action.type){

        case actionType.GET_PRODUCT_DETAILS_REQUEST: 
            return {loading : true}; 

        case actionType.GET_PRODUCT_DETAILS_SUCCESS: 
            return {loading:false,product:action.payload};  //products is an array of objects

        case actionType.GET_PRODUCT_DETAILS_FAIL:
            return {loading:false,error:action.payload}

         case actionType.GET_PRODUCT_DETAILS_RESET:
             return {product:{}}    

        default : 
            return state;
    }
}