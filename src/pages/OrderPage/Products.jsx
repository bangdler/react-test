import React from 'react';

export default function Products({ name, imagePath }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`${imagePath}`} alt={`${name} product`} />
      <form style={{ marginTop: '10px' }}>
        <label style={{ textAlign: 'right' }}>{name}</label>
        <input type={'number'} name={'quantity'} min={'0'} defaultValue={0} />
      </form>
    </div>
  );
}
