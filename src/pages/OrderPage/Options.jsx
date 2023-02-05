import React from 'react';

export default function Options({ name, updateItemCount }) {
  const handleChange = ({ target }) => {
    const count = target.checked ? 1 : 0;
    updateItemCount(name, count);
  };

  return (
    <form>
      <input type={'checkbox'} id={`${name} option`} onChange={handleChange} />
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
}
