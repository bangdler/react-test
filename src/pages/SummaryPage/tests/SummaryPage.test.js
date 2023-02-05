import { screen } from '@testing-library/react';
import React from 'react';

import SummaryPage from '@/pages/SummaryPage/SummaryPage';
import { render } from '@/test-utils';

test('check box click, then confirm order', () => {
  render(<SummaryPage />);
  const checkbox = screen.getByRole('checkbox', { name: '주문하려는 것을 확인하셨나요?' });
  expect(checkbox).not.toBeChecked();
  const confirmButton = screen.getByRole('button', { name: '주문 확인' });
  expect(confirmButton).toBeDisabled();
});
