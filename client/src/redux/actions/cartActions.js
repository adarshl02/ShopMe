
//8_04
import axios from 'axios';
import * as actionType from '../constants/cartConstant';
const URL="/api";
export const addToCart=(id,arr,b)=>async(dispatch)=>{
    try{
        if(b){
            dispatch({type:actionType.ADD_TO_CART_INITIALS,payload:arr});
        }else{
        dispatch({type:actionType.ADD_TO_CART_REQUEST});
        const {data}=await axios.get(`${URL}/product/${id}`);
        dispatch({ type:actionType.ADD_TO_CART, payload:{...data}});
        }
    }catch(err){
        dispatch({ type:actionType.ADD_TO_CART_ERROR, payload:err.message })
    }
}
                 

export const removeFromCart=(id)=>(dispatch)=>{
    dispatch({type:actionType.REMOVE_FROM_CART,payload:id});
}

export const cartReset=()=>async(dispatch)=>{
    try{
        dispatch({type:actionType.CART_RESET});
    }
    catch(err){
        dispatch({type:actionType.CART_RESET_ERROR,payload:err.message});
    }
    

}