import React, { useContext, useState } from 'react';

import { OrderContext } from '@/contexts/OrderContext';

export default function SummaryPage({ setStep }) {
  const [{ products, options, totals }] = useContext(OrderContext);
  const [checked, setChecked] = useState(false);

  const productList = [...products].map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = options.size > 0;
  const optionList = hasOptions && [...options].map(([key, _]) => <li key={key}>{key}</li>);

  const handleSubmit = e => {
    e.preventDefault();
    setStep(2);
  };
  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {totals.products}</h2>
      <ul>{productList}</ul>
      {hasOptions && (
        <>
          <h2>옵션: {totals.options}</h2>
          <ul>{optionList}</ul>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type={'checkbox'}
          id={'confirm-checkbox'}
          checked={checked}
          onChange={({ target }) => setChecked(target.checked)}
        />
        <label htmlFor={'confirm-checkbox'}>주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type={'submit'}>
          주문 확인
        </button>
      </form>
    </div>
  );
}
