import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the NotFound component', () => {
  it('tests if the page contains a heading woth right text and level', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/sumiu');
    const headingNotFound = screen
      .getByRole('heading', { name: /page requested not found/i });
    expect(headingNotFound).toBeDefined();
  });
  it('tests if the page contains the rigth image', () => {
    render(<NotFound />);
    const imagePikachu = screen
      .getByAltText(/pikachu crying because the page requested was not found/i);
    expect(imagePikachu).toBeInTheDocument();
    expect(imagePikachu.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
