import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing the Favortie Pokemon component', () => {
  it('tests if the right message apprears when no favorite poke added', () => {
    render(<FavoritePokemons />);

    const noFavoriteText = screen.getByText(/no favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });

  it('tests if the pokemons marked as favorite appeared on the page', () => {
    const { history } = renderWithRouter(<App />);

    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);
    const addFavPoke = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(addFavPoke);

    history.goForward('/favorites');
    const favMarked = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favMarked).toBeInTheDocument();
    history.goBack('/home');
  });
});
