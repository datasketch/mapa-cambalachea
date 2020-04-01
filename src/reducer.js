export default (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories
      };
    case 'SET_SELECTED':
      return {
        ...state,
        selected: action.selected
      };
    default:
      return state;
  }
};
