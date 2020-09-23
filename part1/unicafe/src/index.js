import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
    >
      {text}
    </button>
  )
}

const Statistic = ({ text, value }) => (
  <p>{text} {value}</p>
)

const Statistics = ({ feedback, stats }) => {
  const { good, neutral, bad } = feedback
  const { total, average, positive } = stats

  if(total <= 0) 
    return <p>No feedback given</p>

  return (
    <>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={total} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
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
  const positive = (total > 0 ? `${good/total*100} %` : 0)
  const stats = { total, average, positive }

  return (
    <div>
      <h1>give feeback</h1>
      <Button text='good' onClick={() => setGood(good + 1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' onClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <Statistics feedback={{ good, neutral, bad }} stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)