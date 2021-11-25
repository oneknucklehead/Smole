import axios from 'axios'
import { config } from 'dotenv'
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
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
