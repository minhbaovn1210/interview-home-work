/* eslint-disable react/prefer-stateless-function */
/**
 *
 * WeHub
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import routes from 'config/routes';

import BlogList from './List';

const BlogRouter = () => (
  <Switch>
    <Route path={[routes.index, routes.blog.index]} component={BlogList} />
  </Switch>
);

BlogRouter.propTypes = {};

export default BlogRouter;
