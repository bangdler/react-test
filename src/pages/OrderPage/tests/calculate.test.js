import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { OrderContextProvider } from '@/contexts/OrderContext';
import Type from '@/pages/OrderPage/Type';

test('update product total when product change', async () => {
  // context 사용 시 wrapper 옵션을 줘야 render 에러가 발생하지 않는다.
  render(<Type orderType={'products'} />, { wrapper: OrderContextProvider });

  // exact false 이면 해당 문구 외에 다른 문구가 포함되어도 찾을 수 있다.
  const productsTotal = screen.getByText('상품 총 가격', { exact: false });
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
