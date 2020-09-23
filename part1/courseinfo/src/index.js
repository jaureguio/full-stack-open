import * as React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ info }) => <p>{info.name} {info.exercises}</p>

const Content = ({
  part1,
  part2,
  part3,
}) => (
  <>
    <Part info={part1} />
    <Part info={part2} />
    <Part info={part3} />
  </>
)

const Total = ({ 
  exercises1, 
  exercises2, 
  exercises3 
}) => (
  <p>
    Number of exercises {exercises1 + exercises2 + exercises3}
  </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total 
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))