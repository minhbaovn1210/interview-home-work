import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the BlogList state domain
 */
const selectBlogListDomain = state => state.BLOG_DOMAIN || initialState;

/**
 * Other specific selectors
 */

export const makeSelectBlogListLoading = () =>
  createSelector(
    selectBlogListDomain,
    substate => substate.loading,
  );

export const makeSelectBlogList = () =>
  createSelector(
    selectBlogListDomain,
    substate => substate.blogList,
  );
