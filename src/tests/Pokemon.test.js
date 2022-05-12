import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemon from '../data';
import App from '../App';

describe('Testing the Pokemon component', () => {
  const pokeDetalPath = '/pokemons/25';
  it('tests if the pokemon card renders with the right answers', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon[0] } />);

    const pokeTitle = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokeTitle && pokeType && pokeWeight).toBeInTheDocument();
    expect(pokeType).toHaveTextContent(/electric/i);
    expect(pokeWeight).toHaveTextContent(/average weight: 6.0 kg/i);
    expect(pokeImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('tests if the pokemon card has the correct link', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon[0] } />);

    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(pokeDetailsLink).toHaveAttribute('href', pokeDetalPath);
  });

  it('tests if the detailsLink, when clicked, the URL page changes', () => {
    const { history } = renderWithRouter(<App />);

    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(pokeDetailsLink);
    history.canGo(pokeDetalPath);

    const pokeDetailTitle = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokeDetailTitle).toBeInTheDocument();
  });

  it('tests if the star icon is rended correctly', () => {
    const { history } = renderWithRouter(<App />);
    // renderWithRouter(<App />);

    const pokeDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetailsLink);
    history.canGo(pokeDetalPath);

    const favMarked = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favMarked);
    history.goBack('/');
    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon.src).toContain('/star-icon.svg');
    expect(starIcon.alt).toContain('Pikachu is marked as favorite');
  });
});
