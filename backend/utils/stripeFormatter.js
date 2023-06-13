const formatOrdersForStripe = (orderItems) => {
  const formattedOrders = orderItems.map((orderItem) => {
    return {
      price_data: {
        currency: "gbp",
        product_data: {
          name: orderItem.name,
          description: orderItem.description,
        },
        unit_amount: orderItem.price * 100,
      },
      quantity: orderItem.totalBoughtQty,
    };
  });
  return formattedOrders;
};

module.exports = formatOrdersForStripe;
