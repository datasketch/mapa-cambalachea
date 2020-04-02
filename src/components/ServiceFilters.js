import React, { useContext } from 'react';
import MapContext from '../context';
import poweredBy from '../icons/poweredby.svg';
import './ServiceFilters.css';

const ServiceFilters = () => {
  const { state, dispatch } = useContext(MapContext);

  const handleChange = e => {
    dispatch({ type: 'SELECT_CATEGORY', selected: e.target.value });
  };

  return (
    <div className="header">
      <div className="filter">
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
      <div>
        <h1 className="header-title">Mapa de solidaridad</h1>
        <img src={poweredBy} style={{ display: 'block', marginLeft: 'auto', height: '1.7rem' }} alt="Powered by Datasketch" />
      </div>
    </div>
  );
};

export default ServiceFilters;
