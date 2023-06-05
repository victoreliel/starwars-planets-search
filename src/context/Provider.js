import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const URL = 'https://swapi.dev/api/planets';

function Provider({ children }) {
  const [generalFilter, setGeneralFilter] = useState([]);
  const [nameFilter, setFilterByName] = useState('');
  const [numericValuesFilter, setFilterByNumericValues] = useState([]);
  const [filterButton, setFilterButton] = useState(false);
  const [columnFilter, setColumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [comparisonOptions, setComparisonOptions] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetch(URL).then((result) => result.json(result));
      const { results } = data;
      const dataFilter = results.filter((e) => delete e.residents);
      setGeneralFilter(dataFilter);
    };
    fetchApi();
  }, []);

  const comparisonFilter = (planet, column, comparison, value) => {
    switch (comparison) {
    case 'menor que':
      return Number(planet[column]) < Number(value);
    case 'maior que':
      return Number(planet[column]) > Number(value);
    default:
      return Number(planet[column]) === Number(value);
    }
  };

  useEffect(() => {
    if (numericValuesFilter.length > 0) {
      numericValuesFilter.forEach((filter) => {
        const { column, comparison, value } = filter;
        const filtered = generalFilter.filter((planet) => (
          comparisonFilter(planet, column, comparison, value)
        ));
        setGeneralFilter(filtered);
      });
    }
  }, [filterButton]); // eslint-disable-line

  const filteredPlanetsList = generalFilter.filter((planet) => (
    planet.name.toLowerCase()).includes(nameFilter.toLocaleLowerCase()));

  const contextValue = {
    generalFilter,
    nameFilter,
    setFilterByName,
    numericValuesFilter,
    setFilterByNumericValues,
    filterButton,
    setFilterButton,
    filteredPlanetsList,
    columnFilter,
    setColumnFilter,
    comparisonOptions,
    setComparisonOptions,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
