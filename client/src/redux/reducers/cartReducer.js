
import { toast } from "react-toastify";
import * as actionType from "../constants/cartConstant";

//called when we dispach from action 8_03
//state me pada hai jo already hai 
//action me pada hai jo store karana hai

export const cartReducer=(state={cartItems:[],loading:false},action)=>{
    switch(action.type){

      case actionType.ADD_TO_CART_REQUEST:
        return{...state,loading:true};
        
       case actionType.ADD_TO_CART_INITIALS:
        const arr = action.payload;
        const items = arr.map((el) => {
          return {
            ...el,
          };
        });
        return {
          ...state,
          cartItems: [...state.cartItems, ...items],loading:false}

       case actionType.ADD_TO_CART:
          const item=action.payload;
          const exist=state.cartItems.find(product=>product.id===item.id);

          if(exist){
            toast.warn("Item already added to Cart");
            return {...state,cartItems:[...state.cartItems],loading:false};

          }else{
            toast.success("Added to Cart ");
            return {...state,cartItems:[...state.cartItems,item],loading:false}
          }

        case actionType.REMOVE_FROM_CART:
          
             return {...state,cartItems:state.cartItems.filter(product=>product.id!==action.payload)}  

        case actionType.CART_RESET:
          return {...state,cartItems:[]}

         default :
         return state;    
    }
}