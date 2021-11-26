import axios from 'axios'
import {
  DETAILS_FAIL,
  DETAILS_REQUEST,
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
} from '../Constants/userConstants'

export const userLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      )

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('login', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const logout = () => (dispatch) => {
  localStorage.removeItem('login')
  dispatch({ type: LOGOUT })
}

export const userRegister =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      )

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      })
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('login', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const userDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DETAILS_REQUEST,
    })

    const {
      login: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, Token failed') {
      dispatch(logout())
    }
    dispatch({
      type: DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_DETAILS_REQUEST,
    })

    const {
      login: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: UPDATE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: UPDATE_DETAILS_FAIL,
      payload: message,
    })
  }
}
