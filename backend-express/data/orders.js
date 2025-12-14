const orders = [
    {
      shippingAddress: {
        address: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
      },
      paymentMethod: 'PayPal',
      isPaid: true,
      paidAt: Date.now(),
      isDelivered: false,
      itemsPrice: 0, // Will be calculated dynamically
      taxPrice: 0,
      shippingPrice: 10,
      totalPrice: 0,
    },
  ];
  
  export default orders;