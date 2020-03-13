import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _get from 'lodash/get';

import { makeSelectLocation } from 'containers/App/selectors';
import routes from 'config/routes';
import Login from './components/Login/Loadable';
import Register from './components/Register/Loadable';

import { Wrapper, FormWrapper } from './StyledComponents';
import Header from './components/Header';

const Auth = () => {
  useEffect(() => {
    // For multiple tab login
    const watchingToken = setInterval(() => {
      const state = JSON.parse(localStorage.getItem('blog_state'));

      if (_get(state, 'global.token.accessToken')) {
        window.location.reload();
      }
    }, 1000);
    return () => {
      clearInterval(watchingToken);
    };
  }, []);

  return (
    <Wrapper>
      <Header />
      <FormWrapper>
        {location.pathname.includes(routes.login) && <Login />}
        {location.pathname.includes(routes.register) && <Register />}
      </FormWrapper>
    </Wrapper>
  );
};

Auth.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(Auth);
