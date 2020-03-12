import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';

import { fields } from './constants';

const { RE_PASSWORD, PASSWORD, NAME, DOB } = fields;

const formValidators = values => {
  const errors = {};

  const requiredFields = [RE_PASSWORD, PASSWORD, NAME, DOB];

  requiredFields.forEach(key => {
    if (!values[key]) {
      errors[key] = formatMessage(globalMessages.canNotBeEmpty);
    }
  });

  if (
    values[PASSWORD] &&
    values[RE_PASSWORD] &&
    values[PASSWORD] !== values[RE_PASSWORD]
  ) {
    errors[RE_PASSWORD] = formatMessage(globalMessages.twoPasswordDoesNotMatch);
  }

  return errors;
};

export default formValidators;
