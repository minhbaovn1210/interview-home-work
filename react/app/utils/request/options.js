/**
 * Request options creators for GET, POST, DELETE, PATCH
 */

import { select } from 'redux-saga/effects';

import { makeSelectAccessToken } from 'containers/App/selectors';

/**
 * Create default header params
 */
function* createBaseHeaders(token) {
  const storeToken = yield select(makeSelectAccessToken());

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || storeToken}`,
  };

  return headers;
}

export function* getOptions(token) {
  const headers = yield* createBaseHeaders(token);

  return {
    method: 'GET',
    headers,
  };
}

export function* postOptions(body = {}, token) {
  const headers = yield* createBaseHeaders(token);

  return {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify(body),
  };
}
