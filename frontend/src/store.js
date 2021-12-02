import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  shopDetailsReducer,
  shopListReducer,
} from './Reducers/shopReducers.js'
import { cartReducer } from './Reducers/cartReducers.js'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from './Reducers/orderReducers.js'
import {
  detailsReducer,
  loginReducer,
  registerReducer,
  updateDetailsReducer,
  userListReducer,
} from './Reducers/userReducers.js'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const loginDataFromStorage = localStorage.getItem('login')
  ? JSON.parse(localStorage.getItem('login'))
  : null
const shippingAddressFromStorage = localStorage.getItem('shipAddress')
  ? JSON.parse(localStorage.getItem('shipAddress'))
  : {}

const reducer = combineReducers({
  shopList: shopListReducer,
  shopDetails: shopDetailsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  login: loginReducer,
  register: registerReducer,
  details: detailsReducer,
  updateDetails: updateDetailsReducer,
  orderCreated: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userOrdersList: orderListReducer,
  usersList: userListReducer,
})
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  login: { userInfo: loginDataFromStorage },
}
const middleWare = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
)
export default store
