import React from 'react';

export default function ErrorBanner({ message }) {
  const errorMsg = message || '에러입니다.';
  return (
    <div data-testid={'error-banner'} style={{ backgroundColor: 'red', color: 'white' }}>
      {errorMsg}
    </div>
  );
}
