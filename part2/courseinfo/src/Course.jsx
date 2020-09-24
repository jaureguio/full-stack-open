import * as React from 'react'

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ info }) => (
  <p>
    {info.name} {info.exercises}
  </p>
);

const Total = ({ total }) => <strong> total of {total} exercises</strong>;

export function Course ({ course }) {
  const { name, parts } = course;

  const total = parts.reduce((total, next) => total + next.exercises, 0);

  return (
    <div>
      <Header course={name} />
      {parts.map((part) => 
        <Part key={part.name} info={part} />
      )}
      <Total total={total} />
    </div>
  );
};