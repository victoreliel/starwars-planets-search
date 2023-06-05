import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    nameFilter,
    setFilterByName,
    numericValuesFilter,
    setFilterByNumericValues,
    filterButton,
    setFilterButton,
    columnFilter,
    setColumnFilter,
    comparisonOptions,
  } = useContext(Context);

  const [selects, setSelects] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleFilterByName = ({ target }) => {
    setFilterByName(target.value);
  };

  const handleSelects = ({ target }) => {
    setSelects({
      ...selects,
      [target.name]: target.value,
    });
  };

  const handleFilterByNumericValues = () => {
    const filterSelect = selects;
    setFilterByNumericValues((prevState) => ([
      ...prevState,
      filterSelect,
    ]));
    setFilterButton(!filterButton);
  };

  const dontShowRepeatedFilters = () => {
    const filteredColumn = columnFilter.filter((column) => column !== selects.column);
    setColumnFilter(filteredColumn);
    setSelects({
      column: filteredColumn[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  const handleClick = () => {
    handleFilterByNumericValues();
    dontShowRepeatedFilters();
  };

  return (
    <section>
      <div>
        <label htmlFor="planetName">
          Pesquise o planeta pelo nome:
          <input
            type="text"
            name="planetName"
            id="planetName"
            data-testid="name-filter"
            value={ nameFilter.filterByName }
            onChange={ handleFilterByName }
          />
        </label>
        <label htmlFor="column">
          Coluna
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            value={ selects.column }
            onChange={ handleSelects }
          >
            {columnFilter.map((column) => (
              <option key={ column } value={ column }>{column}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison">
          Operador
          <select
            name="comparison"
            id="comparison"
            data-testid="comparison-filter"
            value={ selects.comparison }
            onChange={ handleSelects }
          >
            {comparisonOptions.map((comparison) => (
              <option key={ comparison } value={ comparison }>{comparison}</option>
            ))}
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-filter"
            value={ selects.value }
            onChange={ handleSelects }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
      <div>
        <p>Filtros habilitados:</p>
        <ul>
          {numericValuesFilter.map((enabledFilter) => (
            <li key={ enabledFilter.column }>
              {`${enabledFilter.column} 
              ${enabledFilter.comparison} 
              ${enabledFilter.value}`}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Filters;
