import envConfig from 'config/environment';

const { apiHost } = envConfig;

/*
 * GET
 * Blog list
 */
export const getBlogList = () => `${apiHost}/v1/blog`;
