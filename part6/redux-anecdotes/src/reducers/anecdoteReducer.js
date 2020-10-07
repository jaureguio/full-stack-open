import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
    case 'CREATE_ANECDOTE': 
      return [ ...state, ...action.data ]
    case 'INCREMENT_VOTES':
      return state
        .map(( anecdote ) => anecdote.id !== action.data.id ? anecdote : action.data )
    default:
      return state
  }
}

export const initAnecdotes = () => async ( dispatch ) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  })
}

export const createAnecdote = (content) => async ( dispatch ) => {
  const newAnecdote = await anecdoteService.createOne(content)
  dispatch({
    type: 'CREATE_ANECDOTE',
    data: [newAnecdote]
  })
}

export const incrementVotesOf = ( anecdote ) => async ( dispatch ) => {
  anecdote.votes += 1
  const updatedAnecdote = await anecdoteService.updateOne(anecdote)
  dispatch({
    type: 'INCREMENT_VOTES',
    data: updatedAnecdote
  })
}

export default anecdoteReducer