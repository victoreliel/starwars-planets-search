import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import APIData from './APIData';
import {
  NAME_FILTER,
  COLUMN_FILTER,
  COMPARISON_FILTER,
  VALUE_FILTER,
  BUTTON_FILTER,
  endpoint,
} from './constants';

async function waitForPageLoads(length = 11) {
  await waitFor(() => {
    expect(screen.getAllByRole('row')).toHaveLength(length);
  });
}

describe('Testando a aplicação Star Wars Planets Search', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({ json: async () => APIData }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('testa a chamada da api', async () => {
    render(<App />);

    const planetTest = await screen.findByText(/Tatooine/i);

    expect(planetTest).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  });

  it('testa se os filtros de pesquisa são renderizados', () => {
    render(<App />);

    expect(screen.getByTestId(NAME_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(COLUMN_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(COMPARISON_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(VALUE_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(BUTTON_FILTER)).toBeInTheDocument();
  });

  it('testa se a tabela é renderizada', () => {
    render(<App />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('testa se o campo de pesquisa por nome funciona', async () => {
    render(<App />);

    const inputName = screen.getByTestId(NAME_FILTER);
    const planetTest = await screen.findByText(/Tatooine/i);

    userEvent.type(inputName, 'tatoo');
    expect(planetTest).toBeInTheDocument();
  });

  it('testa se a pesquisa por nome funciona corretamente', async () => {
    render(<App />);

    const inputName = screen.getByTestId(NAME_FILTER);
    const planetTest = await screen.findByText(/Alderaan/i);

    userEvent.type(inputName, 'alde');
    expect(planetTest).toBeInTheDocument();
  });

  it('testa se o comparador "maior que" funciona', async () => {
    render(<App />);

    await waitForPageLoads();

    const selectComparison = screen.getByTestId(COMPARISON_FILTER);
    const button = screen.getByTestId(BUTTON_FILTER);

    userEvent.selectOptions(selectComparison, 'maior que');
    expect(selectComparison).toHaveValue('maior que');

    userEvent.click(button);
  });

  it('testa se o comparador "menor que" funciona', async () => {
    render(<App />);

    await waitForPageLoads();

    const selectComparison = screen.getByTestId(COMPARISON_FILTER);
    const button = screen.getByTestId(BUTTON_FILTER);

    userEvent.selectOptions(selectComparison, 'menor que');
    expect(selectComparison).toHaveValue('menor que');

    userEvent.click(button);
  });

  it('testa se o comparador "igual a" funciona', async () => {
    render(<App />);

    await waitForPageLoads();

    const selectComparison = screen.getByTestId(COMPARISON_FILTER);
    const button = screen.getByTestId(BUTTON_FILTER);

    userEvent.selectOptions(selectComparison, 'igual a');
    expect(selectComparison).toHaveValue('igual a');

    userEvent.click(button);
  });
});
