import envConfig from 'config/environment';

const { apiHost } = envConfig;

/*
 * POST
 * User Login
 */
export const postUserLoginURL = () => `${apiHost}/v1/user/login`;

/*
 * POST
 * User Register
 */
export const postRegisterURL = () => `${apiHost}/v1/user/register`;

/*
 * POST
 * Edit user profile
 */
export const postEditUserProfile = () => `${apiHost}/v1/user/edit`;

/*
 * GET
 * User info
 */
export const getUserInfoURL = () => `${apiHost}/v1/user/info`;
