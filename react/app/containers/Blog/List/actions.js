/*
 *
 * WeHub actions
 *
 */

import { GET_BLOG_LIST } from './constants';

export const getBlogList = (params, callbacks) => ({
  type: GET_BLOG_LIST,
  params,
  callbacks,
});
