import * as React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ info }) => <p>{info.name} {info.exercises}</p>

// const Total = ({ parts }) => {
//   const [part1, part2, part3] = parts
//   return (
//     <p>
//       Number of exercises {part1.exercises + part2.exercises + part3.exercises}
//     </p>
//   )
// }

const Course = ({ course }) => {
  const { name, parts } = course
  return (
    <div>
      <Header course={name} />
      {parts.map(part => (
        <Part 
          key={part.name} 
          info={part}
        />
      ))}
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