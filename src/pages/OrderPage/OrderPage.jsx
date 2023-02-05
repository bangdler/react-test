import React, { useContext } from 'react';

import { OrderContext } from '@/contexts/OrderContext';
import Type from '@/pages/OrderPage/Type';

export default function OrderPage({ setStep }) {
  const [{ totals }] = useContext(OrderContext);
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Travel Products</h1>
      <div>
        <Type orderType={'products'} />
      </div>
      <div style={{ display: 'flex', marginTop: '20' }}>
        <div style={{ width: '50%' }}>
          <Type orderType={'options'} />
        </div>
        <div style={{ width: '50%' }}>
          <h2>Total Price: ₩ {totals.total}</h2>
          <br />
          <button onClick={() => setStep(1)}>주문하기</button>
        </div>
      </div>
    </div>
  );
}
