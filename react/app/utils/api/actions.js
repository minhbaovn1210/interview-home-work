/*
 *
 * API actions
 *
 * Create API action to handle API requests
 *
 * Please read: https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc
 */

import {
  REQUEST_API,
  typeAPIRequest,
  typeAPISuccess,
  typeAPIFail,
} from './constants';

/**
 *
 * @prop {string} url: complete URL of api end point
 * @prop {func} method:
 * function use to create request body, header, one of function below (import from `util/request`)
 *    GET
 *    GETWithoutToken
 *    POST
 *    POSTWithoutToken
 *    POSTFormData
 *    POSTFormDataWithoutToken
 * @prop {object} data: [optional] body the request
 * @prop {func} onSuccess: [optional] callback when api success
 * @prop {func} onFail: [optional] call back when api failure
 * @prop {string} label: a string constant use to create action-type when api fail or success; `typeAPIFail()` or `typeAPISuccess()`
 */

export const apiAction = ({
  url,
  method,
  action,
  body,
  onSuccess,
  onFail,
  label,
}) => ({
  type: REQUEST_API,
  request: {
    url,
    method,
    action,
    body,
    onSuccess,
    onFail,
    label,
  },
});

export default apiAction;

/**
 * Action to dispatch when api success
 * @param {string} label: label from `apiAction` to create action
 * @param {object} payload: response body of the request
 */
export const apiActionSuccess = (label, payload) => ({
  type: typeAPISuccess(label),
  payload,
});

/**
 * Action to dispatch when api fail
 * @param {string} label: label from `apiAction` to create action
 * @param {object} error: error response from API end point or network error
 */
export const apiActionFail = (label, error) => ({
  type: typeAPIFail(label),
  error,
});

/**
 * Action to dispatch when call API
 * @param {string} label: label from `apiAction` to create action
 * @param {object} payload: request body
 */
export const apiActionRequest = (label, payload) => ({
  type: typeAPIRequest(label),
  payload,
});
