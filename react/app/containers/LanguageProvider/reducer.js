/*
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../../i18n'; // eslint-disable-line

export const initialState = {
  locale: DEFAULT_LOCALE,
};

/**
 *  Reducer
 */

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;

      default:
        break;
    }
  });

export default languageProviderReducer;
