import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ErrorBanner from '@/components/ErrorBanner';
import Options from '@/pages/OrderPage/Options';
import Products from '@/pages/OrderPage/Products';

export default function Type({ orderType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async optionType => {
    try {
      const response = await axios.get(`/${optionType}`);
      setItems(response.data);
    } catch (e) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message={'에러가 발생했습니다.'} />;
  }
  const ItemComponent = orderType === 'products' ? Products : Options;
  const optionItems = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />);
  return <div>{optionItems}</div>;
}
