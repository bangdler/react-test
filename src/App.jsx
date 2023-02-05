import React, { useState } from 'react';

import '@/App.css';
import { OrderContextProvider } from '@/contexts/OrderContext';
import CompletePage from '@/pages/CompletePage/CompletePage';
import OrderPage from '@/pages/OrderPage/OrderPage';
import SummaryPage from '@/pages/SummaryPage/SummaryPage';

function App() {
  const [step, setStep] = useState(0);
  return (
    <div style={{ padding: '4rem' }}>
      <OrderContextProvider>
        {step === 0 && <OrderPage setStep={setStep} />}
        {step === 1 && <SummaryPage setStep={setStep} />}
        {step === 2 && <CompletePage setStep={setStep} />}
      </OrderContextProvider>
    </div>
  );
}

export default App;
