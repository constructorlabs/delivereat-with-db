import React from 'react';
import '../styles/components/orderadminitem.scss';

function OrderAdminItem({order}) {
  
  return (
    <li className={order.orderId}>Order {order.orderId}&nbsp;&ndash;&nbsp;
      {order.quantity} * {order.name}, &pound;{(order.subtotal).toFixed(2)}</li>
    )
  }

export default OrderAdminItem;