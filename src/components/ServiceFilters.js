import React, { useContext } from 'react';
import MapContext from '../context';

const ServiceFilters = () => {
  const { state, dispatch } = useContext(MapContext);

  const handleChange = e => {
    dispatch({ type: 'SET_SELECTED', selected: e.target.value });
  };

  return (
    <select onChange={handleChange}>
      {state.categories.map(category => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default ServiceFilters;
