export default (state, action) => {
  switch (action.type) {
    case 'SET_SERVICES':
      return {
        ...state,
        services: action.services,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
      };
    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategory: action.selected,
      };
    case 'SELECT_ACTION':
      return {
        ...state,
        selectedAction: action.selected,
      };
    case 'SET_INITIAL_ZOOM': {
      return {
        ...state,
        zoom: action.zoom,
      };
    }
    default:
      return state;
  }
};
