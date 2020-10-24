import React from 'react'
import { TotalProps } from '../utils/types';

const Total: React.FC<TotalProps> = ({ courses }) => (
  <h3>
    {`Course total amount of exercises: ${
      courses.reduce((total, course) => total + course.exerciseCount ,0)
    }`}
  </h3>
)

export default Total