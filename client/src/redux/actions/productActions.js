
import axios from 'axios';
import * as actionTypes from '../constants/productConstants'

const URL="/api";

export const getProducts=()=> async(dispatch)=>{      //middleware ke through api ko call
    try{
        const {data}=await axios.get(`${URL}/products`);  // give response from backend ,not take request
        dispatch({type: actionTypes.GET_PRODUCTS_SUCCESS,payload:data})    //automatically calls productReducer

    }catch(error){
        dispatch({type:actionTypes.GET_PRODUCTS_FAIL,payload:error.message})   //if any error occured then send this payload to reducer
    }
}

//have to call getProducts , then getProducts automatically calls getProductsReducer


//6_04
export const  getProductDetails = (id) => async (dispatch) => {   //when we click on product it will show details of that particular product
    try{
        dispatch({type:actionTypes.GET_PRODUCT_DETAILS_REQUEST});   //send data to reducer
        const {data}= await axios.get(`${URL}/product/${id}`) ;   
        dispatch({type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,payload:data}) 
    }catch(error){
        dispatch({type:actionTypes.GET_PRODUCT_DETAILS_FAIL,payload:error.message})
    }
}

