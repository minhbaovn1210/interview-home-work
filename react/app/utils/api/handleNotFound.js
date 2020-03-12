import { call, all, takeLatest, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import { typeAPIFail } from 'utils/api/constants';

function* navigatePage(routeToGo) {
  yield put(replace(routeToGo));
}

export default function* handleNavigationOnAPIFail(label, routeToGo) {
  yield takeLatest(typeAPIFail(label), navigatePage, routeToGo);
}

/**
 * watch for api fail then navigate to correct page
 * @param listPages
 * [
 *    {
 *      label,
 *      route
 *    }
 * ]
 */
export function* handleListNotFound(listPages) {
  yield all([
    listPages.map((page) =>
      call(handleNavigationOnAPIFail, page.label, page.route),
    ),
  ]);
}
