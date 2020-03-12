/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

export const selectFormDomain = state => state.form;

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    state => state.location,
  );

export const makeSelectUserProfile = () =>
  createSelector(
    selectGlobal,
    state => state.userProfile,
  );

export const makeSelectAccessToken = () =>
  createSelector(
    selectGlobal,
    state => state.token.accessToken,
  );
