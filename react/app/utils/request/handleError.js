import { put } from 'redux-saga/effects';
import { notification } from 'antd';

import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import { logOutAction } from 'containers/App/actions';

/**
 * redux-saga middleware to handle request error
 *
 * @param  {string} errMsg A error message to be displayed
 * @param  {string} errCode A error code response from server ['access_denied', ...]
 *
 */

export default function* handleError(responseError) {
  if (responseError === 'Unauthorized') {
    yield put(logOutAction());
    return;
  }

  notification.error({
    message: formatMessage(globalMessages.error),
    description: responseError.message,
  });
}
