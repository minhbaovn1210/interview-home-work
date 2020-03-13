import { put, takeLatest } from 'redux-saga/effects';
import routes from 'config/routes';

import { POST } from 'utils/request';

import API from 'config/apiUrl';
import { apiAction } from 'utils/api/actions';

import { SUBMIT_ADD_BLOG } from './constants';
/**
 * Submit add blog
 */
export function* submitAddBlog({ values, callbacks }) {
  const { onSuccess, onFail } = callbacks;
  const { tags, ...remainValues } = values;
  const body = remainValues;

  if (Array.isArray(tags)) {
    body.tags = tags.map(item => item.value);
  } else {
    body.tags = [];
  }

  yield put(
    apiAction({
      url: API.postCreateBlog(),
      method: POST,
      label: SUBMIT_ADD_BLOG,
      body,
      onSuccess,
      onFail,
    }),
  );
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* blogListSaga() {
  yield takeLatest(SUBMIT_ADD_BLOG, submitAddBlog);
}
