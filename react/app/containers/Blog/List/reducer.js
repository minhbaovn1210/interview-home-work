import produce from 'immer';
import moment from 'moment';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  typeAPISuccess,
  typeAPIRequest,
  typeAPIFail,
} from 'utils/api/constants';

import {
  GET_BLOG_LIST,
  GET_BLOG_DETAIL,
  SUBMIT_ADD_COMMENT,
} from './constants';
import { DATE_TIME_FORMAT } from 'config/constants';

export const initialState = {
  loading: false,
  blogList: [],

  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 3,
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

      case typeAPISuccess(GET_BLOG_DETAIL):
      case typeAPISuccess(SUBMIT_ADD_COMMENT):
        return handleGetBlogDetailSuccess(state, draft, action);

      // case LOCATION_CHANGE:
      //   draft = initialState;
      //   return draft;

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

  draft.blogList = action.payload.map(item => ({
    ...item,
    created_at: moment(item.created_at).format(DATE_TIME_FORMAT),
    comments: item.comments.reverse().map(c => ({
      ...c,
      created_at: moment(c.created_at).fromNow(),
    })),
  }));

  return draft;
}

function handleGetBlogDetailSuccess(state, draft, action) {
  draft.loading = false;
  draft.blogList = draft.blogList.map(item => {
    if (item._id === action.payload._id) {
      return {
        ...action.payload,
        created_at: moment(action.payload.created_at).format(DATE_TIME_FORMAT),
        comments: action.payload.comments.reverse().map(c => ({
          ...c,
          created_at: moment(c.created_at).fromNow(),
        })),
      };
    }

    return item;
  });

  return draft;
}
