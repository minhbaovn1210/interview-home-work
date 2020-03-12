import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import logo from 'assets/images/icon-512x512.png';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import routes from 'config/routes';

import { makeSelectUserProfile } from 'containers/App/selectors';
import { compose } from 'redux';
import {
  Wrapper,
  HeaderLink,
} from 'containers/PublicPages/components/Header/StyledComponents';

function Header({ userProfile }) {
  return (
    <Wrapper>
      <Link to={routes.index}>
        <img src={logo} alt="logo" /> <span>THE BLOGS</span>
      </Link>

      <HeaderLink>
        <NavLink to={routes.profile.edit}>
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />{' '}
          {formatMessage(globalMessages.hiName, { name: userProfile.name })}
        </NavLink>
      </HeaderLink>
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserProfile(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(Header);
