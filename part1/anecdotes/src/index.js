import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  const [mostVoted, setMostVoted] = useState()

  const handleVote = () => setVotes(incrementVotes)

  const handleAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const incrementVotes = (oldVotes) => {
    const newVotes = [...oldVotes]
    newVotes[selected] += 1

    if (selected !== mostVoted) {
      console.log(newVotes)
      setMostVoted(maxValueIndex(newVotes))
    }

    return newVotes
  }
  
  return (
    <div>
      <AnecdoteView 
        title='Anecdote of the day'
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <button onClick={handleVote}>
        vote
      </button>
      <button onClick={handleAnecdote}>
        next anecdote
      </button>
      {mostVoted !== undefined ? (
        <AnecdoteView
          title='Anecdote with most votes'
          anecdote={anecdotes[mostVoted]}
          votes={votes[mostVoted]}
        />
      ) : (
        <h2>Vote for some anecdote!</h2>
      )}
    </div>
  )
}

const AnecdoteView = ({ title, anecdote, votes }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const maxValueIndex = (arr) => {
  const max = arr.reduce((acc, nextVal, idx) => {
    if (nextVal > acc.val) {
      acc.val = nextVal
      acc.idx = idx
    }
    return acc
  }, {
    val: 0,
    idx: undefined,
  })

  return max.idx
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
