import { render, screen } from '@testing-library/react';
import React from 'react';

import Type from '@/pages/OrderPage/Type';

test('display product images from server', async () => {
  render(<Type optionType={'products'} />);

  // 비동기 요청의 경우 find 메서드
  const productImages = await screen.findAllByRole('img', { name: /product$/i });

  expect(productImages).toHaveLength(2);

  const altTexts = productImages.map(img => img.alt);
  expect(altTexts).toEqual(['America product', 'England product']);
});
