import React from 'react';

function BasketItem({orderItem}) {
  
  return (
      <li>
        <p>{orderItem.name} * {orderItem.quantity} @ &pound;{orderItem.price}<br/>
        Subtotal: &pound;{(orderItem.subtotal).toFixed(2)}
        </p> 
      </li>
    )
  }

export default BasketItem;