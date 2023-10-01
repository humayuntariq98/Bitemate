const calculateTotal = (order) => {
  return order.orderItems.reduce(
    (accumulator, currentValue) =>
      (accumulator += currentValue.foodItem.price * currentValue.quantity),
    0
  );
};

module.exports = { calculateTotal };
