import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_LIST_FAIL,
  SHOP_LIST_REQUEST,
  SHOP_LIST_SUCCESS,
} from '../Constants/shopConstants'
import axios from 'axios'

export const listShops = () => async (dispatch) => {
  try {
    dispatch({ type: SHOP_LIST_REQUEST })
    const { data } = await axios.get(`/api/shop`)
    dispatch({
      type: SHOP_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SHOP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const shopDetail = (shopid) => async (dispatch) => {
  try {
    dispatch({ type: SHOP_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/shop/${shopid}`)
    dispatch({
      type: SHOP_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SHOP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const productDetail = (shopid, productid) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/${shopid}/product/${productid}`)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
