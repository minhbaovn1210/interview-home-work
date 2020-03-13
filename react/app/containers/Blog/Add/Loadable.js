/**
 *
 * Asynchronously loads the component for WeHub
 *
 */

import Loadable from 'react-loadable';

import TopBarLoading from 'components/Loading/TopBarLoading';

export default Loadable({
  loader: () => import('./index'),
  loading: TopBarLoading,
});
