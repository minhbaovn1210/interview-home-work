/**
 *
 * RequireAuthentication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';

import {
  makeSelectAccessToken,
  makeSelectLocation,
} from 'containers/App/selectors';
import { routes, publicPaths, cannotViewIfLoggedInPaths } from 'config/routes';
import { isMatchRoute } from 'utils/common';

/**
 * Check if user has logged in
 */
const Authentication = ({ token, children, location }) => {
  const loggedIn = checkLoggedIn(token);

  // if logged in and go to `/login` => redirect to `/`
  if (loggedIn && isPublicPath(location.pathname)) {
    return <Redirect to="/" />;
  }

  // Valid route
  if (loggedIn && !isPublicPath(location.pathname)) {
    return children;
  }

  if (!loggedIn && !isPublicPath(location.pathname)) {
    return <Redirect to={routes.login} />;
  }

  return null;
};

Authentication.propTypes = {
  children: PropTypes.any,
  token: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectAccessToken(),
  location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Authentication);

//----------------------------------------------------------------------

const checkMatchPathInRoutes = (configRoutes, currentPath) => {
  let isMatch = false;
  configRoutes.forEach(path => {
    if (isMatchRoute(path, currentPath)) {
      isMatch = true;
    }
  });

  return isMatch;
};
// check if current route is public route
const isPublicPath = currentPath =>
  checkMatchPathInRoutes(publicPaths, currentPath);

// check if JWT is valid
function checkLoggedIn(token) {
  if (typeof token === 'string' && token.length > 0) {
    return true;
  }
  return false;
}
