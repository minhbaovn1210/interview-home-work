import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';

import { fields } from './constants';

const { USERNAME, PASSWORD } = fields;

const formValidators = values => {
  const errors = {};

  if (!values[USERNAME]) {
    errors[USERNAME] = formatMessage(globalMessages.canNotBeEmpty);
  }

  if (!values[PASSWORD]) {
    errors[PASSWORD] = formatMessage(globalMessages.canNotBeEmpty);
  }

  return errors;
};

export default formValidators;
