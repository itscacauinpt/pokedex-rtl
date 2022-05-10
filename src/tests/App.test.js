import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

describe('Testeing the App component', () => {
  it('tests if the links text and ref are correct', () => {
    // reminder: browserRouter is no more inside the app, now is in the index,sooo we'll put the memoryRouter in this app that we render freshy freshy
    render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
    );

    const navLinks = screen.getAllByRole('link');
    expect(navLinks[0]).toHaveTextContent(/home/i);
    expect(navLinks[1]).toHaveTextContent(/about/i);
    expect(navLinks[2]).toHaveTextContent(/favorite pokémons/i);

  });

  it('tests if the links are redirected to the right paths when clicked', () => {
    const { history } = renderWithRouter(<App />);

    const navLinkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(navLinkHome);
    history.canGo('/home')
    const headingHome = screen.getByRole('heading', {  name: /encountered pokémons/i})
    expect(headingHome).toBeInTheDocument();

    const navLinkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(navLinkAbout);
    history.canGo('/about')
    const headingAbout = screen.getByRole('heading', {  name: /about pokédex/i});
    expect(headingAbout).toBeInTheDocument();

    const navLinkFavPoke = screen.getByRole('link', { name: /favorite pokémons/i});
    userEvent.click(navLinkFavPoke);
    history.canGo('/favorite')
    const headingFavPoke = screen.getByRole('heading', {  name: /favorite pokémons/i});
    expect(headingFavPoke).toBeInTheDocument();
  })

  it('tests the 404 page, it has to appear when redirected to a non existing route', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/sumiu');
    const headingNotFound = screen.getByRole('heading', {  name: /page requested not found/i});
    expect(headingNotFound).toBeDefined();
  })
});
