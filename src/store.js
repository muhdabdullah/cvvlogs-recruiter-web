import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers/Rootreducer';
export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
}















// import {createStore,combineReducers, compose, applyMiddleware} from 'redux';
// // import {productListReducer,productDetailsReducer, productSaveReducer, productDeleteReducer} from './reducers/productReducers';
// // import {cartReducer} from './reducers/cartReducers'
// import thunk from 'redux-thunk';
// // import  Cookie  from 'js-cookie';
// import  {userSigninReducer,userRegisterReducer}  from './reducers/userReducers';
// // const cartItems=Cookie.getJSON("cartItems")||[]
// // const userInfo=Cookie.getJSON("userInfo")||null
// // const initialState={cart:{cartItems},userSignin:{userInfo}};
// const reducer=combineReducers({
//     // productList:productListReducer,
//     // productDetails:productDetailsReducer,
//     // cart:cartReducer,
//     userSignin:userSigninReducer,
//     userRegister:userRegisterReducer,
//     // productSave:productSaveReducer,
//     // productDelete:productDeleteReducer
    
// })
// const store=createStore(reducer,compose(applyMiddleware(thunk)))
// // thunk is a middleware for redux, allow us to apply async operaion inside action in the redux
// export default store;