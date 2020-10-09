import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import AuthUser from './AuthUser'

const Nav = styled.nav`
  font-size: 0.8rem;
  margin-bottom: 5px;
  padding: 5px;
  background-color: black;
  color: lightgrey;
  text-transform: uppercase;
  text-align: center;

  > * {
    margin: 0 5px;
  }
`

const NavGroup = ({ children }) => (
  <span>{children}</span>
)

const StyledLink = styled(Link)`
  border-bottom: ${({ selected }) => selected ? '2px solid white' : 'none'};
  color: ${({ selected }) => selected ? 'white' : 'lightgrey'};
  text-decoration: none;
  margin: 0 5px;

  &:hover {
    color: white;
  }
`

const NavigationMenu = () => {
  const [selectedIdx, setSelectedIdx] = useState(0)

  const handleSelectedIdx = (idx) => {
    setSelectedIdx(idx)
  }

  return (
    <Nav>
      <NavGroup>
        {
          ['blogs','users'].map((text, idx) => (
            <StyledLink
              key={text+idx}
              onClick={() => handleSelectedIdx(idx)}
              selected={idx===selectedIdx}
              to={`/${text}`}
            >
              {text}
            </StyledLink>
          ))
        }
      </NavGroup>
      <AuthUser />
    </Nav>
  )
}

export default NavigationMenu