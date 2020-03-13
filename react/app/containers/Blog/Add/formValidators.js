import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';

import { fields } from './constants';

const { TITLE, CONTENT, TAGS } = fields;

const formValidators = values => {
  const errors = {};

  const requiredFields = [TITLE];

  requiredFields.forEach(key => {
    if (!values[key]) {
      errors[key] = formatMessage(globalMessages.canNotBeEmpty);
    }
  });

  return errors;
};

export default formValidators;
