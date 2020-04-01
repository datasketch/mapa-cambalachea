import React, { useEffect, useReducer } from 'react';
import ServiceFilters from './components/ServiceFilters';
import ServiceMap from './components/ServiceMap';
import MapContext from './context';
import reducer from './reducer';

import data from './data.json';
// import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    services: data,
    categories: [],
    selected: null
  });

  useEffect(() => {
    const categories = state.services.reduce((categories, service) => {
      const exists = categories.some(
        category => category.slug === service.category_slug
      );
      return exists
        ? categories
        : [
            ...categories,
            { name: service.category_name, slug: service.category_slug }
          ];
    }, []);

    dispatch({ type: 'SET_CATEGORIES', categories });
    dispatch({ type: 'SET_SELECTED', selected: categories[0].slug });
  }, [state.services]);

  return (
    <>
      <MapContext.Provider value={{ state, dispatch }}>
        <ServiceFilters />
        <ServiceMap />
      </MapContext.Provider>
    </>
  );
}

export default App;
