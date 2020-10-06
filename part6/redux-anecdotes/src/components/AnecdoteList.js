import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVotesOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const orderedAnecdotes = [...state].sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
    return orderedAnecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => dispatch(incrementVotesOf(id))

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

export default AnecdoteList