import React, { useState } from 'react'

const Togglable = ({ buttonText, children }) => {
  const [ visibility, setVisibility ] = useState( false )

  const showWhenVisible = { display: visibility ? 'block' : 'none' }
  const hideWhenVisible = { display: visibility ? 'none' : 'block' }

  return (
    <div>
      <div style={ hideWhenVisible }>
        <button onClick={ () => setVisibility( true ) }>{ buttonText }</button>
      </div>
      <div style={ showWhenVisible }>
        { children({ setVisibility }) }
        <button onClick={ () => setVisibility( false ) }>cancel</button>
      </div>
    </div>
  )
}

export default Togglable