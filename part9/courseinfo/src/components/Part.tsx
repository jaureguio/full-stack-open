import React from 'react';

import { assertNever } from '../utils/typeValidators'
import { CoursePart } from '../utils/types';

const Part: React.FC<{ 
  key: string;
  coursePart: CoursePart;
}> = ({ coursePart }) => {
  switch (coursePart.name) {
    case 'Fundamentals': {
      const { name, exerciseCount, description } = coursePart
      return (
        <div>
          <h2>{name}</h2>
          <p>Description: {description}</p>
          <p>Amount of exercises: {exerciseCount}</p>
        </div>
      )
    }
    case 'Using props to pass data': {
      const { name, exerciseCount, groupProjectCount } = coursePart
      return (
        <div>
          <h2>{name}</h2>
          <p>Group projects: {groupProjectCount}</p>
          <p>Amount of exercises: {exerciseCount}</p>
        </div>
      )
    }
    case 'Deeper type usage': {
      const { name, exerciseCount, description, exerciseSubmissionLink } = coursePart
      return (
        <div>
          <h2>{name}</h2>
          <p>Description: {description}</p>
          <p>Amount of exercises: {exerciseCount}</p>
          <p>More details: {exerciseSubmissionLink}</p>
        </div>
      )
    }
    case 'Developing a MERN stack application': {
      const { name, exerciseCount, prerequisites } = coursePart
      return (
        <div>
          <h2>{name}</h2>
          <p>Amount of exercises: {exerciseCount}</p>
          <p>Prerequisites: {prerequisites}</p>
        </div>
      )
    }
    default:
      return assertNever(coursePart)
  }
} 

export default Part