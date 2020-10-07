import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initAnecdotes, incrementVotesOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ 
  anecdotes,
  filterText,
  initAnecdotes,
  incrementVotesOf,
  setNotification
}) => {
  const filteredAnecdotes = [...anecdotes]
      .filter(({ content }) => content.toLowerCase().includes(filterText))
  const orderedAnecdotes = filteredAnecdotes
    .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)

  const vote = (anecdote) => {
    incrementVotesOf(anecdote)
    setNotification(`You voted for "${anecdote.content}"`, 5)
  }

  useEffect(() => {
    initAnecdotes()
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

const mapStateToProps = (state) => {
  const { anecdotes, filterText } = state
  return { anecdotes, filterText }
}

const mapDispatchToProps = {
  initAnecdotes,
  incrementVotesOf,
  setNotification
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)