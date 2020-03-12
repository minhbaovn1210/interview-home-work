import {
  LOG_IN,
  LOG_OUT,
  GET_USER_INFO,
  REGISTER,
  EDIT_USER_PROFILE,
} from './constants';

export const logInAction = (values, callbacks) => ({
  type: LOG_IN,
  values,
  callbacks,
});

export const registerAction = (values, callbacks) => ({
  type: REGISTER,
  values,
  callbacks,
});

export const editUserProfileAction = (values, callbacks) => ({
  type: EDIT_USER_PROFILE,
  values,
  callbacks,
});

export const logOutAction = () => ({
  type: LOG_OUT,
});

export const getUserInfoAction = () => ({
  type: GET_USER_INFO,
});
