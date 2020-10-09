import userService from '../services/users'

const usersActions = {
  GET_ALL_USERS: 'GET_ALL_USERS',
}

const userReducer = (state = [], action) => {
  switch (action.type) {
    case usersActions.GET_ALL_USERS:
      return action.data.users

    default:
      return state
  }
}

export const getAllUsers = () => async ( dispatch ) => {
  const users = await userService.getAll()
  dispatch({
    type: usersActions.GET_ALL_USERS,
    data: { users }
  })
}

export default userReducer