const calculateTotal = (order) => {
  return order.orderItems.reduce(
    (accumulator, currentValue) => (accumulator += currentValue.price),
    0
  );
};
