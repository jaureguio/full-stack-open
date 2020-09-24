import * as React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ info }) => <p>{info.name} {info.exercises}</p>

const Total = ({ total }) => <strong> total of {total} exercises</strong>

const Course = ({ course }) => {
  const { name, parts } = course

  const total = parts.reduce((total, next) => total + next.exercises, 0)

  return (
    <div>
      <Header course={name} />
      {parts.map(part => (
        <Part 
          key={part.name} 
          info={part}
        />
      ))}
      <Total total={total} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))