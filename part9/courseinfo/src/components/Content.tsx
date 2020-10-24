import React from 'react'

import { ContentProps } from '../utils/types';

import Part from './Part'

const Content: React.FC<ContentProps> = (props) => (
  <>
    {props.courses.map((course, id) => (
      <Part 
        key={course.name+id} 
        coursePart={course} 
      />
    ))}
  </>
)

export default Content