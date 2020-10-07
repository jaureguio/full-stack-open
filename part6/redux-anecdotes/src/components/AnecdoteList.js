import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initAnecdotes, incrementVotesOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const orderedAnecdotes = useSelector(({ anecdotes, filterText }) => {
    const filteredAnecdotes = [...anecdotes]
      .filter(({ content }) => content.toLowerCase().includes(filterText))
    return filteredAnecdotes
      .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(incrementVotesOf(anecdote))
    dispatch(setNotification(`You voted for "${anecdote.content}"`, 5))
  }

  useEffect(() => {
    dispatch(initAnecdotes())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return orderedAnecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

// const findInArray = (arr, valName, val) => arr.find(item => item[valName] === val)

export default AnecdoteList