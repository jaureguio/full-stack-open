const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.message
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const showNotification = (message) => ({
  type: 'SHOW_NOTIFICATION',
  data: { message }
})

export const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION',
})

export default notificationReducer