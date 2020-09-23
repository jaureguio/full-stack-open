import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ feedback, stats }) => {
  return (
    <>
      <h2>statistics</h2>
      <p>good {feedback.good}</p>
      <p>neutral {feedback.neutral}</p>
      <p>bad {feedback.bad}</p>
      <p>all {stats.total}</p>
      <p>average {stats.average}</p>
      <p>positive {`${stats.positive}%`}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (total > 0 ? (good - bad)/total : 0)
  const positive = (total > 0 ? good/total*100 : 0)
  const stats = { total, average, positive }

  return (
    <div>
      <h1>give feeback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics feedback={{ good, neutral, bad }} stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)