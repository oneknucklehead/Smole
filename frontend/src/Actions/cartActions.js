import axios from 'axios'
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from '../Constants/cartConstants.js'

export const addToCart =
  (shopid, productid, quantity, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/${shopid}/product/${productid}`)

    dispatch({
      type: ADD_TO_CART,
      payload: {
        productId: data._id,
        shopId: shopid,
        name: data.name,
        category: data.category,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        sizes: data.sizes,
        quantity,
        size,
      },
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  })
  localStorage.removeItem('cartItems')
}
