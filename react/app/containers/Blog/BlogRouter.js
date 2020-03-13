/* eslint-disable react/prefer-stateless-function */
/**
 *
 * BlogRouter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import routes from 'config/routes';

import BlogList from './List';
import AddBlog from './Add';

const BlogRouter = () => (
  <Switch>
    <Route exact path={routes.blog.add} component={AddBlog} />
    <Route path={[routes.index, routes.blog.index]} component={BlogList} />
  </Switch>
);

BlogRouter.propTypes = {};

export default BlogRouter;
