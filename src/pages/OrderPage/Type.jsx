import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Products from '@/pages/OrderPage/Products';

export default function Type({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems(optionType);
  }, [optionType]);

  const loadItems = async optionType => {
    try {
      const response = await axios.get(`/${optionType}`);
      setItems(response.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
  const ItemComponent = optionType === 'products' ? Products : null;
  const optionItems = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />);
  return <div>{optionItems}</div>;
}
