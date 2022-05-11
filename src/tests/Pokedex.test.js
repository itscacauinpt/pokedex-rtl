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
    // const abutton = filtersButton[0].textContent;
    // const bbutton = filtersButton[1].textContent;
    // expect(abutton).not.toEqual(bbutton);
    // expect(filtersButton[0]).toBeInTheDocument();
    // console.log(filtersButton[0].textContent);

    const filtersButtonNames = filtersButton.map((ele) => ele.textContent);
    console.log(filtersButtonNames);

    for (let i = 0; i <= filtersName.length; i + 1) {
      expect(filtersButtonNames[i]).toEqual(filtersName[i]);
    }
  });

  it('tests if the cleanFilter works perfectly', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const filterAll = screen.getByRole('button', { name: /all/i });
    expect(filterAll).toBeInTheDocument();
  });
});
