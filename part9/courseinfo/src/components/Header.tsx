import React from 'react';
import { HeaderProps } from '../utils/types';

const Header: React.FC<HeaderProps> = (props) => <h1>{props.name}</h1>

export default Header