import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('App test', () => {
  it('should render app', () => {
    render(<App />);
    expect(screen.getByText(/Todo list/i)).toBeInTheDocument();
  });
  it('should render the snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should update state when a new item is received from input box', () => {
    render(<App />);
    const button = screen.getByText(/add items/i);
    const textInput = screen.getByRole('textbox');
    userEvent.type(textInput, 'task 01');
    userEvent.click(button);
    expect(screen.getByText('task 01')).toBeInTheDocument();
  });
  it('should update id when a new item is received from input box', () => {
    render(<App />);
    const button = screen.getByText(/add items/i);
    const textInput = screen.getByRole('textbox');
    userEvent.type(textInput, 'task 01');
    userEvent.click(button);
    userEvent.type(textInput, 'task 02');
    userEvent.click(button);
    expect(screen.getByTestId(1).textContent).toBe('task 01');
    expect(screen.getByTestId(2).textContent).toBe('task 02');
  });
});
