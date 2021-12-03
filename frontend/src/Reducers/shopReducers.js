import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  SELLER_SHOP_DETAILS_FAIL,
  SELLER_SHOP_DETAILS_REQUEST,
  SELLER_SHOP_DETAILS_SUCCESS,
  SHOP_DELETE_FAIL,
  SHOP_DELETE_REQUEST,
  SHOP_DELETE_SUCCESS,
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_LIST_FAIL,
  SHOP_LIST_REQUEST,
  SHOP_LIST_SUCCESS,
} from '../Constants/shopConstants'

export const shopListReducer = (state = { shops: [] }, action) => {
  switch (action.type) {
    case SHOP_LIST_REQUEST:
      return { loading: true, shops: [] }
    case SHOP_LIST_SUCCESS:
      return { loading: false, shops: action.payload }
    case SHOP_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const shopDetailsReducer = (state = { shop: {} }, action) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return { loading: true, shop: {} }
    case SHOP_DETAILS_SUCCESS:
      return { loading: false, shop: action.payload }
    case SHOP_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: {} }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeletedReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, result: action.payload }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const sellerShopsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_SHOP_DETAILS_REQUEST:
      return { loading: true }
    case SELLER_SHOP_DETAILS_SUCCESS:
      return { loading: false, shops: action.payload }
    case SELLER_SHOP_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const shopDeletedReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_DELETE_REQUEST:
      return { loading: true }
    case SHOP_DELETE_SUCCESS:
      return { loading: false, result: action.payload }
    case SHOP_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
