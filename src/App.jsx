import React, { useState } from 'react';

import '@/App.css';

function App() {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="App">
      <h3 data-testid="counter">{count}</h3>
      <div>
        <button data-testid="minus-button" disabled={disabled} onClick={() => setCount(count => count - 1)}>
          -
        </button>
        <button data-testid="plus-button" disabled={disabled} onClick={() => setCount(count => count + 1)}>
          +
        </button>
      </div>
      <div>
        <button
          data-testid="on/off-button"
          style={{ backgroundColor: 'blue' }}
          onClick={() => setDisabled(prev => !prev)}
        >
          on/off
        </button>
      </div>
    </div>
  );
}

export default App;