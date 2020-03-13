import { takeLatest, put, select, all } from 'redux-saga/effects';
import { replace } from 'connected-react-router';

import { POST, GET } from 'utils/request';
import { apiAction } from 'utils/api/actions';
import API from 'config/apiUrl';
import { typeAPISuccess } from 'utils/api/constants';

import {
  LOG_IN,
  GET_USER_INFO,
  REGISTER,
  EDIT_USER_PROFILE,
} from 'containers/App/constants';

export function* submitLogin(action) {
  const {
    values,
    callbacks: { onSuccess, onFail },
  } = action;

  yield put(
    apiAction({
      url: API.postUserLoginURL(),
      method: POST,
      label: LOG_IN,
      body: values,
      onFail,
      onSuccess,
    }),
  );
}

export function* submitRegister(action) {
  const {
    values,
    callbacks: { onSuccess, onFail },
  } = action;

  yield put(
    apiAction({
      url: API.postRegisterURL(),
      method: POST,
      label: REGISTER,
      body: values,
      onSuccess,
      onFail,
    }),
  );
}

export function* fetchUserInfo({ token }) {
  yield put(
    apiAction({
      url: API.getUserInfoURL(token),
      method: GET,
      label: GET_USER_INFO,
    }),
  );
}

export function* submitEditUserProfile({ values, callbacks }) {
  const { onSuccess, onFail } = callbacks;

  yield put(
    apiAction({
      url: API.postEditUserProfile(),
      method: POST,
      label: EDIT_USER_PROFILE,
      body: values,
      onSuccess,
      onFail,
    }),
  );
}

export default function* AuthSaga() {
  yield takeLatest(LOG_IN, submitLogin);
  yield takeLatest(REGISTER, submitRegister);
  yield takeLatest(EDIT_USER_PROFILE, submitEditUserProfile);

  yield takeLatest(GET_USER_INFO, fetchUserInfo);
}
