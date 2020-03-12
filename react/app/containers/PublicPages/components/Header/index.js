import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from 'assets/images/icon-512x512.png';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import routes from 'config/routes';

import { Wrapper, HeaderLink } from './StyledComponents';

function Header() {
  return (
    <Wrapper>
      <Link to={routes.login}>
        <img src={logo} alt="logo" />
      </Link>

      <HeaderLink>
        <NavLink to={routes.login}>
          {formatMessage(globalMessages.login)}
        </NavLink>
        <NavLink to={routes.register}>
          {formatMessage(globalMessages.register)}
        </NavLink>
      </HeaderLink>
    </Wrapper>
  );
}

export default Header;
