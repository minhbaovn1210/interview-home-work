/**
 *
 * API Constants
 *
 */

// action type to start a api request
export const REQUEST_API = '@app/REQUEST_API';

// Action type prefix of request API
export const API_REQUEST = '[API_REQUEST]';
export const API_SUCCESS = '[API_SUCCESS]';
export const API_FAIL = '[API_FAIL]';

/**
 * Generate `action type` base on label when api success or fail
 * Use this function to catch action type in reducer or saga (if need)
 */
export const typeAPIRequest = (label) => `${API_REQUEST} ${label}`;
export const typeAPISuccess = (label) => `${API_SUCCESS} ${label}`;
export const typeAPIFail = (label) => `${API_FAIL} ${label}`;
