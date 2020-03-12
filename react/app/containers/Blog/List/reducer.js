import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  typeAPISuccess,
  typeAPIRequest,
  typeAPIFail,
} from 'utils/api/constants';

import { GET_BLOG_LIST } from './constants';

export const initialState = {
  loading: false,
  blogList: [],

  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  },
};

/* eslint-disable no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case typeAPIRequest(GET_BLOG_LIST):
        draft.loading = true;
        return draft;
      case typeAPIFail(GET_BLOG_LIST):
        draft.loading = false;
        return draft;
      case typeAPISuccess(GET_BLOG_LIST):
        return handleGetBlogListSuccess(state, draft, action);

      case LOCATION_CHANGE:
        draft = initialState;
        return draft;

      default:
        return draft;
    }
  });

export default reducer;

/**
 *  Action handlers
 */

function handleGetBlogListSuccess(state, draft, action) {
  draft.loading = false;
  draft.blogList = action.payload.data;
  draft.pagination = action.payload.pagination;
  return draft;
}
