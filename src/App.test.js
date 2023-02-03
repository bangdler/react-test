import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import App from '@/App';

test('the counter starts at 0', () => {
  render(<App />);
  // screen 객체를 이용하여 원하는 요소에 접근
  const $counter = screen.getByTestId('counter');
  expect($counter).toHaveTextContent(0);
});

test('minus button has correct text', () => {
  render(<App />);
  const $minusButton = screen.getByTestId('minus-button');
  expect($minusButton).toHaveTextContent('-');
});

test('plus button has correct text', () => {
  render(<App />);
  const $plusButton = screen.getByTestId('plus-button');
  expect($plusButton).toHaveTextContent('+');
});

test('When the plus button is pressed, the counter changes to 1', () => {
  render(<App />);
  const $plusButton = screen.getByTestId('plus-button');
  fireEvent.click($plusButton);
  const $counter = screen.getByTestId('counter');
  expect($counter).toHaveTextContent(1);
});

test('When the minus button is pressed, the counter changes to -1', () => {
  render(<App />);
  const $minusButton = screen.getByTestId('minus-button');
  fireEvent.click($minusButton);
  const $counter = screen.getByTestId('counter');
  expect($counter).toHaveTextContent(-1);
});

test('on/off button has blue color', () => {
  render(<App />);
  const $onOffButton = screen.getByTestId('on/off-button');
  expect($onOffButton).toHaveStyle({ backgroundColor: 'blue' });
});

test('When on/off button is pressed, prevent the +,- buttons from being pressed', () => {
  render(<App />);
  const $onOffButton = screen.getByTestId('on/off-button');
  fireEvent.click($onOffButton);
  const $minusButton = screen.getByTestId('minus-button');
  const $plusButton = screen.getByTestId('plus-button');

  expect($minusButton).toBeDisabled();
  expect($plusButton).toBeDisabled();
});
