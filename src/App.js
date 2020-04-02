import React, { useEffect, useReducer } from 'react';
import ServiceFilters from './components/ServiceFilters';
import ServiceMap from './components/ServiceMap';
import MapContext from './context';
import reducer from './reducer';
import data from './data.json';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    services: data,
    categories: [],
    selectedCategory: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://cambalachea.co/categories/services'
      );
      const data = await response.json();
      dispatch({ type: 'SET_SERVICES', services: data });
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

      const search = window.location.search.substring(1);
      const category = search.match(/category=(\w+)&?/);
      const action = search.match(/action=(\w+)&?/);

      if (category) {
        dispatch({ type: 'SELECT_CATEGORY', selected: category[1] });
      }
      if (action) {
        dispatch({ type: 'SELECT_ACTION', selected: action[1] });
      }
    };
    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
