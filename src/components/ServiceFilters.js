import React, { useContext } from 'react';
import MapContext from '../context';

const ServiceFilters = () => {
  const { state, dispatch } = useContext(MapContext);

  const handleChange = e => {
    dispatch({ type: 'SET_SELECTED', selected: e.target.value });
  };

  return (
    <>
      <div>
        <label htmlFor="category-filter">Filtrar por categoría</label>
        <select onChange={handleChange} id="category-filter">
          <option value="">Todas</option>
          {state.categories.map(category => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ServiceFilters;
