export const loadState = () => {
  let serializedState = {};
  try {
    serializedState = localStorage.getItem('blog_state');
    !!serializedState && (serializedState = JSON.parse(serializedState)); //eslint-disable-line
  } catch (err) {
    throw Error('Error loading from localStorage');
  }

  return serializedState;
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('blog_state', serializedState);
  } catch (err) {
    throw Error('Error saving to localStorage');
  }
};
