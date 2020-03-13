import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the BlogList state domain
 */
const selectBlogAddEditDomain = state => state.BLOG_ADD_EDIT || initialState;

/**
 * Other specific selectors
 */

export const makeSelectBlogAddEditLoading = () =>
  createSelector(
    selectBlogAddEditDomain,
    substate => substate.loading,
  );

export const makeSelectBlogAddEditDetail = () =>
  createSelector(
    selectBlogAddEditDomain,
    substate => substate.blog,
  );
