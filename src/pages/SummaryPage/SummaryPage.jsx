import React, { useState } from 'react';

export default function SummaryPage() {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <form>
        <input
          type={'checkbox'}
          id={'confirm-checkbox'}
          checked={checked}
          onChange={({ target }) => setChecked(target.checked)}
        />
        <label htmlFor={'confirm-checkbox'}>주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type={'submit'}>
          주문확인
        </button>
      </form>
    </div>
  );
}
