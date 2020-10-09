import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

export const authActions = {
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
  LOGOUT_USER: 'LOGOUT_USER',
}

const userLocalStorage = JSON.parse(window.localStorage.getItem('bloglist-user'))

const initialState = {
  authUser: userLocalStorage || null,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.LOGIN_USER_SUCCESS:
      return {
        error: null,
        authUser: action.data.user
      }

    case authActions.LOGIN_USER_FAILURE:
      return {
        error: action.data.error,
        authUser: null
      }

    case authActions.LOGOUT_USER:
      return {
        error: null,
        authUser: null
      }
    default:
      return state
  }
}

export const login = ( credentials ) => async ( dispatch ) => {
  const { username, password } = credentials

  const response = await loginService.login({ username, password })

  if(!response.error) {
    dispatch({
      type: authActions.LOGIN_USER_SUCCESS,
      data: {
        user: response
      }
    })
    dispatch(showNotification({ message: `Welcome ${username}` }))
    blogService.setToken(response.token)
    window.localStorage.setItem('bloglist-user', JSON.stringify(response))
  } else {
    dispatch({
      type: authActions.LOGIN_USER_FAILURE,
      data: {
        error: response.error
      }
    })
    dispatch(showNotification({ message: 'Invalid credentials', type: 'error' }))
  }
}

export const logout = () => ( dispatch ) => {
  dispatch({
    type: authActions.LOGOUT_USER,
  })
  window.localStorage.removeItem('bloglist-user')
}

export default userReducer