import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = state => state.language || initialState;

/**
 * Select the language locale
 */

export const makeSelectLocale = () =>
  createSelector(
    selectLanguage,
    languageState => languageState.locale,
  );
