import React, { useContext } from 'react';
import { AppContext } from '../App';

export default function Product() {
  const { user } = useContext(AppContext);

  return (
    <div style={{ margin: '30px' }}>
      {user.token && <h2>Welcome! {user.name}</h2>}
      <h3>Product List</h3>
    </div>
  );
}
