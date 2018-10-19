import React from 'react';

function OrderItem({orderItem}) {
  
  return (
      <li>
        <p>{orderItem.name} * {orderItem.quantity} @ &pound;{orderItem.price}<br/>
        Subtotal: &pound;{orderItem.subtotal}
        </p> 
      </li>
    )
  }

export default OrderItem;