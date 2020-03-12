/*
 * export intl.formatMessage to use everywhere
 *
 * origin: https://stackoverflow.com/a/50213482
 */

import { intlShape } from 'react-intl';

// ======================================================
// React intl passes the messages and format functions down the component
// tree using the 'context' scope. the injectIntl HOC basically takes these out
// of the context and injects them into the props of the component. To be able to
// import this translation functionality as a module anywhere (and not just inside react components),
// this function inherits props & context from its parent and exports a singleton that'll
// expose all that shizzle.
// ======================================================
let INTL;
const IntlGlobalProvider = (props, context) => {
  INTL = context.intl;
  return props.children;
};

IntlGlobalProvider.contextTypes = {
  intl: intlShape.isRequired,
};

// ======================================================
// Class that exposes translations
// ======================================================
let instance;
class IntlTranslator {
  // Singleton
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  // ------------------------------------
  // Formatting Functions
  // ------------------------------------
  formatMessage(message, values) {
    if (!INTL) {
      console.warn(
        '[IntlGlobalProvider] Cannot export `formatMessage()` as singleton',
      );
    }

    return INTL
      ? INTL.formatMessage(message, values)
      : (descriptor) => descriptor.defaultMessage;
  }
}

export const intl = new IntlTranslator();
export const { formatMessage } = intl;
export default IntlGlobalProvider;
