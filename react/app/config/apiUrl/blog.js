import envConfig from 'config/environment';

const { apiHost } = envConfig;

/*
 * GET
 * Blog list
 */
export const getBlogList = () => `${apiHost}/v1/post`;

/*
 * Post
 * Create blog
 */
export const postCreateBlog = () => `${apiHost}/v1/post`;

/*
 * Post
 * Add comment
 */
export const postAddCommentToBlog = () => `${apiHost}/v1/post/add-comment`;

/*
 * Get
 * Blog detail
 */
export const getBlogDetail = postId =>
  `${apiHost}/v1/post/get-detail?postId=${postId}`;
