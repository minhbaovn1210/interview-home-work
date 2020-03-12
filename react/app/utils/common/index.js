/**
 *
 * Check if current `pathname` is match with route config
 */

export const isMatchRoute = (pathname, routeConfig) => {
  const routeArray = routeConfig.split('/');
  const currentPathnameArray = pathname.split('?')[0].split('/');

  if (routeArray.length !== currentPathnameArray.length) return false;

  let isMatch = true;

  currentPathnameArray.forEach((pathEle, index) => {
    // param started with `:`
    if (pathEle[0] !== ':' && pathEle !== routeArray[index]) {
      isMatch = false;
    }
  });

  return isMatch;
};
