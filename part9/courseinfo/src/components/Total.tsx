import React from 'react'
import { TotalProps } from '../utils/types';

const Total: React.FC<TotalProps> = ({ courses }) => (
  <p>
    {`Number of exercises: ${
      courses.reduce((total, course) => total + course.exerciseCount ,0)
    }`}
  </p>
)

export default Total