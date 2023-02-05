import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '@/App';

test('from order to order completion', async () => {
  render(<App />);
  // 주문 페이지
  const americaInput = await screen.findByRole('spinbutton', { name: 'America' });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, '2');

  const englandInput = await screen.findByRole('spinbutton', { name: 'England' });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, '3');

  const insuranceCheckbox = await screen.findByRole('checkbox', { name: 'Insurance' });
  userEvent.click(insuranceCheckbox);

  const orderButton = screen.getByRole('button', { name: '주문하기' });
  userEvent.click(orderButton);

  // 주문 확인 페이지
  const summaryHeading = screen.getByRole('heading', { name: '주문 확인' });
  // 페이지에 heading 이 있는지 확인
  expect(summaryHeading).toBeInTheDocument();

  const productsHeading = screen.getByRole('heading', { name: '여행 상품: 5000' });
  expect(productsHeading).toBeInTheDocument();

  const optionsHeading = screen.getByRole('heading', { name: '옵션: 500' });
  expect(optionsHeading).toBeInTheDocument();

  expect(screen.getByText('2 America')).toBeInTheDocument();
  expect(screen.getByText('3 England')).toBeInTheDocument();
  expect(screen.getByText('Insurance')).toBeInTheDocument();

  const confirmCheckbox = screen.getByRole('checkbox', { name: '주문하려는 것을 확인하셨나요?' });
  userEvent.click(confirmCheckbox);

  const confirmOrderButton = screen.getByRole('button', { name: '주문 확인' });
  userEvent.click(confirmOrderButton);

  // 주문 완료 페이지
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const completeHeading = await screen.findByRole('heading', { name: '주문이 성공하였습니다.' });
  expect(completeHeading).toBeInTheDocument();

  const totals = await screen.findByText('₩ 5500');
  expect(totals).toBeInTheDocument();

  // queryBy 는 없는 경우 Null return
  const loadingDisappeared = screen.queryByText('loading');
  expect(loadingDisappeared).not.toBeInTheDocument();

  // not wrapped in act 오류
  // 테스트가 끝나고 비동기 호출, 렌더링이 발생할 경우에 발생한다.
  // 원래도 렌더링 등 변경 상황에서 act 함수로 감싸줘야 한다. 평소에는 react/testing library 에서 해결해줌.
  // wait for API 를 이용하면 act 로 감싸준 것과 같다.
  const firstPageButton = screen.getByRole('button', { name: '첫페이지로' });
  userEvent.click(firstPageButton);

  // 첫 페이지에 발생할 일을 넣어줌으로써 위의 오류 해결 (wait for + getByRole = findByRole)
  await screen.findByRole('spinbutton', { name: 'America' });

  // 첫 페이지 렌더링 시 상태 reset
  const productsTotal = screen.getByText('products 총 가격 : ₩ 0');
  expect(productsTotal).toBeInTheDocument();

  const optionsTotal = screen.getByText('options 총 가격 : ₩ 0');
  expect(optionsTotal).toBeInTheDocument();
});
