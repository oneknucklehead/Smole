import {
  DETAILS_FAIL,
  DETAILS_REQUEST,
  DETAILS_RESET,
  DETAILS_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_DETAILS_FAIL,
  UPDATE_DETAILS_REQUEST,
  UPDATE_DETAILS_SUCCESS,
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
} from '../Constants/userConstants'

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true }
    case LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true }
    case REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export const detailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case DETAILS_REQUEST:
      return { ...state, loading: true }
    case DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case DETAILS_RESET:
      return { user: {} }
    // case LOGOUT:
    //   return {}
    default:
      return state
  }
}

export const updateDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DETAILS_REQUEST:
      return { loading: true }
    case UPDATE_DETAILS_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case UPDATE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return { loading: true }
    case USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USERS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
