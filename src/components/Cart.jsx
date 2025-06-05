// Example fix in cart render
products.map(
  (value) =>
    cart[value._id] && (
      <div key={value._id}>
        {value.name} - ₹{value.price} × {cart[value._id]}
        <button onClick={() => decrement(value._id)}>-</button>
        {cart[value._id]}
        <button onClick={() => increment(value._id)}>+</button>
        = ₹{value.price * cart[value._id]}
      </div>
    )
);
