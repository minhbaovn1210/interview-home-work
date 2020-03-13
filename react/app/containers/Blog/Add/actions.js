/*
 *
 * AddBlog actions
 *
 */

import { SUBMIT_ADD_BLOG } from './constants';

export const submitAddBlog = (values, callbacks = {}) => ({
  type: SUBMIT_ADD_BLOG,
  values,
  callbacks,
});
