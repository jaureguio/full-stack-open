import React, { Fragment } from 'react'

const People = ({ data, onDelete }) =>
  data.map(({ name, number, id }) => (
    <Fragment key={name + id}>
      <p>
        {`${name} ${number} `}
        <button onClick={() => onDelete({ name, id })}>delete</button>
      </p>
    </Fragment>
  )
)

export default People
