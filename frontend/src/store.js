import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  shopDetailsReducer,
  shopListReducer,
} from './Reducers/shopReducers.js'
import { cartReducer } from './Reducers/cartReducers.js'
import { loginReducer } from './Reducers/userReducers.js'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const loginDataFromStorage = localStorage.getItem('login')
  ? JSON.parse(localStorage.getItem('login'))
  : null

const reducer = combineReducers({
  shopList: shopListReducer,
  shopDetails: shopDetailsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  login: loginReducer,
})
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  login: { userInfo: loginDataFromStorage },
}
const middleWare = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
)
export default store
