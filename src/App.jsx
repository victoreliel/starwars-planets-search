import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Filters from './components/Filters';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
