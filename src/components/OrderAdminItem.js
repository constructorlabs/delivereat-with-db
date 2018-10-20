import React from 'react';

function OrderAdminItem({orderItem, quantity, price}) {
  
  return (
      <li>
        <h2>Order ID: {orderItem.orderId}</h2>
        <p>Menu Item: {orderItem.name}<br />
        Quantity: {orderItem.quantity}<br />
        Price: {orderItem.price}
        </p> 
      </li>
    )
  }

export default OrderAdminItem;