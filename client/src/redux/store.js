import { createStore, applyMiddleware, combineReducers } from 'redux';  //devtools ke ander apane middleware ko pass karana hai to applyMiddleware
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

 import { cartReducer } from './reducers/cartReducer'; //8_02
// getProductDetailsReducer,

//6_06
import {  getProductDetailsReducer, getProductReducer } from './reducers/productReducer';

const reducer = combineReducers({
     
    getProducts: getProductReducer,                //name of store of reducer
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer,  //8_01
})


const middleware = [thunk];

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;