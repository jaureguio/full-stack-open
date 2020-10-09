const notificationActions = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
}

const initialState = {
  message: '',
  type: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationActions.SHOW_NOTIFICATION:
      return {
        message: action.data.message,
        type: action.data.type,
      }
    case notificationActions.REMOVE_NOTIFICATION:
      return initialState
    default:
      return state
  }
}

let notificationId

export const showNotification = ({
  message = '',
  type = 'success',
  durationInSeconds = 5
}) => ( dispatch ) => {
  if(notificationId) clearTimeout(notificationId)
  dispatch({
    type: notificationActions.SHOW_NOTIFICATION,
    data: {
      message,
      type,
    }
  })
  notificationId = setTimeout(() => {
    dispatch({
      type: notificationActions.REMOVE_NOTIFICATION
    })
  }, durationInSeconds*1000)
}

export default notificationReducer