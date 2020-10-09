import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const CancelButton = styled(Button)`
  && {
    font-size: 0.75rem;
  }
`

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
        <CancelButton
          size='small'
          color='secondary'
          variant='outlined'
          onClick={ () => setVisibility( false ) }
        >
          cancel
        </CancelButton>
      </div>
    </div>
  )
}

export default Togglable