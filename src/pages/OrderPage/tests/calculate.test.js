import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import OrderPage from '@/pages/OrderPage/OrderPage';
import Type from '@/pages/OrderPage/Type';
import { render } from '@/test-utils';

test('update product total when product change', async () => {
  // context 사용 시 wrapper 옵션을 줘야 render 에러가 발생하지 않는다.
  render(<Type orderType={'products'} />);

  // exact false 이면 해당 문구 외에 다른 문구가 포함되어도 찾을 수 있다.
  const productsTotal = screen.getByText('products 총 가격', { exact: false });
  expect(productsTotal).toHaveTextContent('0');

  const americaInput = await screen.findByRole('spinbutton', { name: 'America' });
  // input 이나 textarea 를 텍스트를 선택 후 제거해줌. 위에서 같은 요소를 사용한 경우 해주면 좋음.
  userEvent.clear(americaInput);
  userEvent.type(americaInput, '1');
  expect(productsTotal).toHaveTextContent('1000');

  const englandInput = await screen.findByRole('spinbutton', { name: 'England' });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, '3');
  expect(productsTotal).toHaveTextContent('4000');
});

test('update option total when option change', async () => {
  // context 사용 시 wrapper 옵션을 줘야 render 에러가 발생하지 않는다.
  render(<Type orderType={'options'} />);

  // exact false 이면 해당 문구 외에 다른 문구가 포함되어도 찾을 수 있다.
  const optionsTotal = screen.getByText('options 총 가격', { exact: false });
  expect(optionsTotal).toHaveTextContent('0');

  const insuranceCheckbox = await screen.findByRole('checkbox', { name: 'Insurance' });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent('500');

  const dinnerCheckbox = await screen.findByRole('checkbox', { name: 'Dinner' });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('1000');

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('500');
});

describe('total price of products and options', () => {
  test('total price starts with 0 and updating the price adding a product', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price', { exact: false });
    expect(total).toHaveTextContent('0');

    const americaInput = await screen.findByRole('spinbutton', { name: 'America' });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');
    expect(total).toHaveTextContent('1000');
  });
  test('update total price when adding a option', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price', { exact: false });
    const insuranceCheckbox = await screen.findByRole('checkbox', { name: 'Insurance' });
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent('500');

  });
  test('update total price when removing products and options', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price', { exact: false });
    const americaInput = await screen.findByRole('spinbutton', { name: 'America' });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '3');

    const insuranceCheckbox = await screen.findByRole('checkbox', { name: 'Insurance' });
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent('3500');

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent('1000');
  });
});
