import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testing the About component', () => {
  it('tests if the page contains the right pokedex info', () => {
    render(<About />);
    const firstPara = screen.getByText(/a digital encyclopedia/i);
    const secondPara = screen.getByText(/and see more details for each one of them/i);
    expect(firstPara && secondPara).toBeInTheDocument();
  });
  it('tests if the heading contains the right title', () => {
    render(<About />);
    const title = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(title).toBeInTheDocument();
  });
  it('tests if the page contains two info paragraphs', () => {
    render(<About />);
    const firstPara = screen.getByText(/a digital encyclopedia/i);
    const secondPara = screen.getByText(/and see more details for each one of them/i);
    const paragraphs = [firstPara, secondPara];
    expect(paragraphs).toHaveLength(2);
  });
  it('tests if th page contains a pokedex image', () => {
    render(<About />);
    const pokedexImg = screen.getByRole('img', { name: /pokédex/i });
    expect(pokedexImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // const imageRef = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    expect(pokedexImg).toBeInTheDocument();
  });
});
