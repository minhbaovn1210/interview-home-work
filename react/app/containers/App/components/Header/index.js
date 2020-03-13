import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Dropdown } from 'antd';
import { bindActionCreators } from 'redux';

import logo from 'assets/images/icon-512x512.png';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import routes from 'config/routes';
import { logOutAction } from 'containers/App/actions';

import { makeSelectUserProfile } from 'containers/App/selectors';
import { compose } from 'redux';
import {
  Wrapper,
  HeaderLink,
} from 'containers/PublicPages/components/Header/StyledComponents';

function Header({ userProfile, logout }) {
  return (
    <Wrapper>
      <Link to={routes.index}>
        <img src={logo} alt="logo" /> <span>THE BLOGS</span>
      </Link>

      <HeaderLink>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <div onClick={logout}>
                  {formatMessage(globalMessages.logout)}
                </div>
              </Menu.Item>
            </Menu>
          }
        >
          <NavLink to={routes.profile.edit}>
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              icon={<UserOutlined />}
            />{' '}
            {formatMessage(globalMessages.hiName, { name: userProfile.name })}
          </NavLink>
        </Dropdown>
      </HeaderLink>
    </Wrapper>
  );
}

Header.propTypes = {
  userProfile: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserProfile(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout: logOutAction }, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
