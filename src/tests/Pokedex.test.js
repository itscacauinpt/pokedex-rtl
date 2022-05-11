import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import renderWithRouter from './renderWithRouter';

const pokeList = [
  'Pikachu',
  'Charmander',
  'Caterpie',
  'Ekans',
  'Alakazam',
  'Mew',
  'Rapidash',
  'Snorlax',
  'Dragonair',
];

const filtersName = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

describe('Testing the Pokedex component', () => {
  it('tests if the page contains a h2 with the right text', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const headText = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(headText).toBeInTheDocument();
  });

  it('tests the NextPokemon button', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    for (let i = pokeList.length + 1; i <= pokeList.length; i + 1) {
      userEvent.click(nextPokemon);
      const pokeName = screen.getByText(pokeList[i]);
      expect(pokeName).toBeInTheDocument();
    }
  });

  it('tests if all the filters button are rendered correctly', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const filtersButton = screen.getAllByTestId('pokemon-type-button');
    filtersButton.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    const buttonNames = filtersButton.map((ele) => ele.textContent);
    const correctName = buttonNames
      .every((ele) => filtersName.some((name) => ele === name));

    expect(correctName).toBe(true);
  });

  it('tests if the cleanFilter works perfectly', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const cleanFilter = screen.getByRole('button', { name: /all/i });
    expect(cleanFilter).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    const allButtons = screen.getAllByRole('button');
    allButtons.forEach((ele) => {
      userEvent.click(ele);
      userEvent.click(nextPokemon);
      userEvent.click(cleanFilter);
    });
  });
});
