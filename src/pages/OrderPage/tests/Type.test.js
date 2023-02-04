import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import { server } from '@/mocks/server';
import Type from '@/pages/OrderPage/Type';

test('display product images from server', async () => {
  render(<Type orderType={'products'} />);

  // 비동기 요청의 경우 find 메서드
  const productImages = await screen.findAllByRole('img', { name: /product$/i });

  expect(productImages).toHaveLength(2);

  const altTexts = productImages.map(img => img.alt);
  expect(altTexts).toEqual(['America product', 'England product']);
});

test('when face error during fetching', async () => {
  server.resetHandlers(
    rest.get('/products', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Type orderType={'products'} />);
  const errorBanner = await screen.findByTestId('error-banner');
  expect(errorBanner).toHaveTextContent('에러가 발생했습니다.');
});

test('fetch option information from server', async () => {
  render(<Type orderType={'options'} />);

  const optionCheckboxes = await screen.findAllByRole('checkbox');
  expect(optionCheckboxes).toHaveLength(2);
});
