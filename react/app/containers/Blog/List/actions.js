/*
 *
 * BlogList actions
 *
 */

import {
  GET_BLOG_LIST,
  GET_BLOG_DETAIL,
  SUBMIT_ADD_COMMENT,
} from './constants';

export const getBlogList = (params, callbacks = {}) => ({
  type: GET_BLOG_LIST,
  params,
  callbacks,
});

export const getBlogDetail = (postId, callbacks = {}) => ({
  type: GET_BLOG_DETAIL,
  postId,
  callbacks,
});
export const submitAddComment = (values, callbacks = {}) => ({
  type: SUBMIT_ADD_COMMENT,
  values,
  callbacks,
});
