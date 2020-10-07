const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.content
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = ( content, durationInSeconds ) => ( dispatch ) => {
  dispatch(showNotification(content))
  setTimeout(() => {
    dispatch(removeNotification())
  }, durationInSeconds*1000)
}

const showNotification = (content) => ({
  type: 'SHOW_NOTIFICATION',
  data: { content }
})

const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION',
})

export default notificationReducer