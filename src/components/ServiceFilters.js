import React, { useContext } from 'react';
import MapContext from '../context';
import './ServiceFilters.css';

const ServiceFilters = () => {
  const { state, dispatch } = useContext(MapContext);

  const handleChange = e => {
    dispatch({ type: 'SELECT_CATEGORY', selected: e.target.value });
  };

  return (
    <div className="filters">
      <label className="filter-label" htmlFor="category-filter">
        Filtrar por categoría
      </label>
      <select
        className="filter-select"
        onChange={handleChange}
        id="category-filter"
        value={state.selectedCategory}
      >
        <option value="">Todas</option>
        {state.categories.map(category => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ServiceFilters;
