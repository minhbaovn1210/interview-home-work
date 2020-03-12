import { formatMessage } from './IntlGlobalProvider';

const getMessage = (message, ...rest) => {
  if (!message || !message.id) return '__CANNOT_FIND_THIS_MESSAGE__';

  const translatedMessage = formatMessage(message, ...rest);

  if (typeof translatedMessage === 'function') {
    return translatedMessage(message, ...rest);
  }

  return formatMessage(message, ...rest);
};

export default getMessage;
