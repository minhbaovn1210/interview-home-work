import { put, takeLatest } from 'redux-saga/effects';
import routes from 'config/routes';

import { GET, POST } from 'utils/request';

import API from 'config/apiUrl';
import { apiAction } from 'utils/api/actions';

import {
  GET_BLOG_LIST,
  SUBMIT_ADD_COMMENT,
  GET_BLOG_DETAIL,
} from './constants';

/**
 * Get Blog List
 */
export function* fetchBlogList({ params }) {
  yield put(
    apiAction({
      url: API.getBlogList(params),
      method: GET,
      label: GET_BLOG_LIST,
    }),
  );
}

/**
 * Get Blog Detail
 */
export function* fetchBlogDetail({ postId }) {
  yield put(
    apiAction({
      url: API.getBlogDetail(postId),
      method: GET,
      label: GET_BLOG_DETAIL,
    }),
  );
}

/**
 * Submit add comment
 */
export function* submitAddComment({ values, callbacks }) {
  const { onSuccess, onFail } = callbacks;

  yield put(
    apiAction({
      url: API.postAddCommentToBlog(),
      method: POST,
      label: SUBMIT_ADD_COMMENT,
      body: values,
      onSuccess,
      onFail,
    }),
  );
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* blogListSaga() {
  yield takeLatest(GET_BLOG_LIST, fetchBlogList);
  yield takeLatest(GET_BLOG_DETAIL, fetchBlogDetail);
  yield takeLatest(SUBMIT_ADD_COMMENT, submitAddComment);
}
