import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import ErrorBanner from '@/components/ErrorBanner';
import { OrderContext } from '@/contexts/OrderContext';

export default function CompletePage({ setStep }) {
  const [orderData, , resetOrderCounts] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const orderCompleted = useCallback(async () => {
    try {
      const response = await axios.post('/order', orderData);
      setOrderHistory(response.data);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  }, [orderData]);

  useEffect(() => {
    orderCompleted();
  }, [orderCompleted]);

  if (error) return <ErrorBanner />;

  const handleClick = () => {
    resetOrderCounts();
    setStep(0);
  };

  const orderTable = orderHistory.map(item => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>₩ {item.price}</td>
    </tr>
  ));

  if (loading) return <div>loading</div>;
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>주문이 성공하였습니다.</h2>
      <h3>지금까지 모든 주문</h3>
      <br />
      <table style={{ margin: 'auto', border: '1px solid black' }}>
        <tbody>
          <tr>
            <th>주문 번호</th>
            <th>주문 가격</th>
          </tr>
          {orderTable}
        </tbody>
      </table>
      <button onClick={handleClick}>첫페이지로</button>
    </div>
  );
}
