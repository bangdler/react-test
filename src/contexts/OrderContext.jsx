import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const OrderContext = createContext();

export const pricePerItem = {
  products: 1000,
  options: 500,
};

const calculateSubTotal = (orderType, orderCountMap) => {
  let totalCount = 0;

  for (const count of orderCountMap.values()) {
    totalCount += count;
  }
  return totalCount * pricePerItem[orderType];
};

export function OrderContextProvider({ children }) {
  const [orderCounts, setOrderCounts] = useState({ products: new Map(), options: new Map() });
  const [totals, setTotals] = useState({ products: 0, options: 0, total: 0 });

  useEffect(() => {
    const productsTotal = calculateSubTotal('products', orderCounts.products);
    const optionsTotal = calculateSubTotal('options', orderCounts.options);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const resetOrderCounts = useCallback(() => setOrderCounts({ products: new Map(), options: new Map() }), []);

  const updateItemCount = useCallback(
    (itemName, newItemCount, orderType) => {
      const newOrderCounts = { ...orderCounts };
      newOrderCounts[orderType].set(itemName, parseInt(newItemCount));
      setOrderCounts(newOrderCounts);
    },
    [orderCounts]
  );

  const value = useMemo(() => {
    return [{ ...orderCounts, totals }, updateItemCount, resetOrderCounts];
  }, [orderCounts, totals, resetOrderCounts, updateItemCount]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
