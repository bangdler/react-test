import React from 'react';

export default function Products({ name, imagePath, updateItemCount }) {
  const handleChange = ({ target }) => updateItemCount(name, target.value);

  return (
    <div style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`${imagePath}`} alt={`${name} product`} />
      <form style={{ marginTop: '10px' }}>
        <label htmlFor={name} style={{ textAlign: 'right' }}>
          {name}
        </label>
        <input id={name} type={'number'} name={'quantity'} min={'0'} defaultValue={0} onChange={handleChange} />
      </form>
    </div>
  );
}
