import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVotesOf } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filterText }) => {
    const filteredAnecdotes = [...anecdotes]
      .filter(({ content }) => content.toLowerCase().includes(filterText))
    const orderedAnecdotes = filteredAnecdotes
      .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
    return orderedAnecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    const votedAnecdote = findInArray(anecdotes, 'id', id)
    dispatch(incrementVotesOf(id))
    dispatch(showNotification(votedAnecdote.content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }

  return anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const findInArray = (arr, valName, val) => arr.find(item => item[valName] === val)

export default AnecdoteList