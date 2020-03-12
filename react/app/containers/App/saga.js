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
  // const {
  //   values,
  //   callbacks: { onSuccess, onFail },
  // } = action;

  // yield put(
  //   apiAction({
  //     url: API.postRegisterURL(),
  //     method: POST,
  //     label: REGISTER,
  //     body: values,
  //     onFail,
  //     onSuccess,
  //   }),
  // );

  yield put({
    type: typeAPISuccess(REGISTER),
    payload: {
      accessToken: '12345',
    },
  });

  action.callbacks.onSuccess({ accessToken: '12345' });
}

export function* fetchUserInfo({ token }) {
  // yield put(
  //   apiAction({
  //     url: API.getUserInfoURL(token),
  //     method: GET,
  //     label: GET_USER_INFO,
  //     onFail,
  //     onSuccess,
  //   }),
  // );

  yield put({
    type: typeAPISuccess(GET_USER_INFO),
    payload: {
      id: 4,
      username: 'admin',
      name: 'Admin',
      dob: '31/12/2012',
      created_at: 1576506719083,
    },
  });
}

export function* submitEditUserProfile({ values, callbacks }) {
  // yield put(
  //   apiAction({
  //     url: API.postEditUserProfile(),
  //     method: POST,
  //     label: EDIT_USER_PROFILE,
  //     body: values,
  //     onFail,
  //     onSuccess,
  //   }),
  // );

  // if (redirectPath) {
  //   yield put(replace(redirectPath));
  // }

  yield put({
    type: typeAPISuccess(EDIT_USER_PROFILE),
    payload: {
      id: 4,
      username: 'admin',
      name: values.name,
      dob: values.dob,
    },
  });

  callbacks.onSuccess();
}

export default function* AuthSaga() {
  yield takeLatest(LOG_IN, submitLogin);
  yield takeLatest(REGISTER, submitRegister);
  yield takeLatest(EDIT_USER_PROFILE, submitEditUserProfile);

  yield takeLatest(GET_USER_INFO, fetchUserInfo);
}
