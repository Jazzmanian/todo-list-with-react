import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

describe('App test', () => {
  it('should render app', () => {
    render(<App />);
    expect(screen.getByText(/Todo list/i)).toBeInTheDocument();
  });
  it('should render the snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
