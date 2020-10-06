const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      return action.data.filter
    default:
      return state
  }
}

export const addFilter = (filter) => ({
  type: 'ADD_FILTER',
  data: {
    filter
  }
})

export default filterReducer