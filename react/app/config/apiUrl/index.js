/**
 * Re-export all api config for easy import
 */

import * as user from './user';
import * as blog from './blog';

const apiUrl = {
  ...user,
  ...blog,
};

export default apiUrl;
