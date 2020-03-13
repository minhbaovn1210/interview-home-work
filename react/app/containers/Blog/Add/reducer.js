import produce from 'immer';

export const initialState = {
  loading: false,
  blog: {},
};

/* eslint-disable no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      default:
        return draft;
    }
  });

export default reducer;

/**
 *  Action handlers
 */
