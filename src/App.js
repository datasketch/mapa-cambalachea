import React, { useEffect, useReducer } from 'react';
// import ServiceFilters from './components/ServiceFilters';
import ServiceMap from './components/ServiceMap';
import MapContext from './context';
import reducer from './reducer';
import poweredBy from './icons/poweredby.svg';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    services: [],
    categories: [],
    selectedCategory: '',
    selectedAction: '',
    zoom: null,
    center: null
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://reddecuidadociudadano.gov.co/categories/services'
      );
      const data = await response.json();
      dispatch({ type: 'SET_SERVICES', services: data });
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const categories = state.services.reduce((categories, service) => {
      const exists = categories.some(
        (category) => category.slug === service.category_slug
      );
      return exists
        ? categories
        : [
            ...categories,
            { name: service.category_name, slug: service.category_slug },
          ];
    }, []);
    dispatch({ type: 'SET_CATEGORIES', categories });
  }, [state.services]);

  useEffect(() => {
    const search = window.location.search.substring(1);
    const category = search.match(/category=(\w+)&?/);
    const action = search.match(/action=(\w+)&?/);
    const zoom = search.match(/zoom=(\d+)&?/);
    const center = search.match(/center=(.*)&?/);

    if (category) {
      dispatch({ type: 'SELECT_CATEGORY', selected: category[1] });
    }
    if (action) {
      dispatch({ type: 'SELECT_ACTION', selected: action[1] });
    }
    if (zoom) {
      dispatch({ type: 'SET_INITIAL_ZOOM', zoom: parseInt(zoom[1], 10) });
    }
    if (center) {
      const coordinates = center[1].split(',')
      if (coordinates.length !== 2) {
        return
      }
      const isValid = coordinates.every(n => !isNaN(n))
      if (!isValid) {
        return
      }
      const latlng = coordinates.map(parseFloat)
      dispatch({ type: 'SET_INITIAL_CENTER', center: latlng })
    }
  }, []);

  return (
    <>
      <MapContext.Provider value={{ state, dispatch }}>
        {/* <ServiceFilters /> */}
        <ServiceMap />
        <div className="brand">
          <a
            href="https://www.datasketch.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={poweredBy}
              style={{ display: 'block', marginLeft: 'auto', height: '1.7rem' }}
              alt="Powered by Datasketch"
            />
          </a>
        </div>
      </MapContext.Provider>
    </>
  );
}

export default App;
