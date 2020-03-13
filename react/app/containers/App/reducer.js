import produce from 'immer';
import moment from 'moment';
import { notification } from 'antd';

import {
  typeAPISuccess,
  typeAPIFail,
  typeAPIRequest,
} from 'utils/api/constants';
import { DATE_FORMAT } from 'config/constants';

import {
  LOG_IN,
  GET_USER_INFO,
  LOG_OUT,
  REGISTER,
  EDIT_USER_PROFILE,
} from './constants';

// The initial state of the App
/* eslint-disable camelcase */
export const initialState = {
  token: {
    accessToken: '',
  },
  userProfile: {
    username: '',
    dob: '',
    name: '',
  },
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case typeAPISuccess(LOG_IN):
      case typeAPISuccess(REGISTER):
        return handleLoginSuccess(state, draft, action);

      case typeAPISuccess(LOG_OUT):
        return handleLogout(state, draft, action);

      case typeAPISuccess(GET_USER_INFO):
      case typeAPISuccess(EDIT_USER_PROFILE):
        return handleGetUserInfoSuccess(state, draft, action);

      default:
        return draft;
    }
  });

export default appReducer;

/* eslint-disable no-param-reassign, no-unused-vars */
function handleLoginSuccess(state, draft, action) {
  const { accessToken } = action.payload;

  draft.token.accessToken = accessToken;

  return draft;
}

function handleLogout(state, draft, action) {
  draft = initialState;

  return draft;
}

function handleGetUserInfoSuccess(state, draft, action) {
  draft.userProfile = {
    ...draft.userProfile,
    ...action.payload,
    dob: moment(action.payload.dob).format(DATE_FORMAT),
  };

  return draft;
}
