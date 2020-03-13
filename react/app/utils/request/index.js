import { call, select, take } from 'redux-saga/effects';

import request from './request';
import { getOptions, postOptions } from './options';
import handleError from './handleError';

/**
 * @param {string} url
 */
export function* GET(url, accessToken) {
  const options = yield* getOptions(accessToken);
  let response;

  try {
    response = yield call(request, url, options);
  } catch (error) {
    yield* handleError(error);

    throw error;
  }

  return response;
}

/**
 * @param {string} url
 * @param {Object} body
 */
export function* POST(url, body, accessToken) {
  const options = yield* postOptions(body, accessToken);
  let response;

  try {
    response = yield call(request, url, options);
  } catch (error) {
    console.log('function*POST -> error', error);
    yield* handleError(error);

    throw error;
  }

  return response;
}
