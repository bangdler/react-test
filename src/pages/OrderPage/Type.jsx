import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import ErrorBanner from '@/components/ErrorBanner';
import { OrderContext, pricePerItem } from '@/contexts/OrderContext';
import Options from '@/pages/OrderPage/Options';
import Products from '@/pages/OrderPage/Products';

export default function Type({ orderType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [{ totals }, updateItemCount] = useContext(OrderContext);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async orderType => {
    try {
      const response = await axios.get(`/${orderType}`);
      setItems(response.data);
    } catch (e) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message={'에러가 발생했습니다.'} />;
  }
  const ItemComponent = orderType === 'products' ? Products : Options;
  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, orderType)}
    />
  ));
  return (
    <>
      <h2>주문 종류 : {orderType}</h2>
      <p>하나의 가격 : ₩ {pricePerItem[orderType]}</p>
      <p>
        {orderType} 총 가격 : ₩ {totals[orderType]}
      </p>
      <div style={{ display: 'flex', flexDirection: orderType === 'options' && 'column' }}>{optionItems}</div>
    </>
  );
}
