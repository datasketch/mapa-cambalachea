export default (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories
      };
    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategory: action.selected
      };
    case 'SELECT_ACTION':
      return {
        ...state,
        selectedAction: action.selected
      };
    default:
      return state;
  }
};
