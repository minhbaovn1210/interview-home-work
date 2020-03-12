/**
 * All available routes
 */

export const routes = {
  index: '/',
  register: '/register',
  login: '/login',

  logout: '/logout',
  profile: {
    index: '/profile',
    edit: '/profile/edit',
  },
  blog: {
    index: '/blog',
    add: '/blog/add',
    edit: '/blog/edit/:id',
  },
};

/**
 * Config routes
 */
export const publicPaths = [routes.login, routes.register];

export default routes;
