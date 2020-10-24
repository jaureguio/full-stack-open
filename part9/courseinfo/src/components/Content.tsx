import React from 'react'
import { ContentProps } from '../utils/types';

const Content: React.FC<ContentProps> = (props) => (
  <>
    {props.courses.map(({ name, exerciseCount }, id) => (
      <p key={name+id}>{name} {exerciseCount}</p>
    ))}
  </>
)

export default Content