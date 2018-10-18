import React from 'react';

function OrderItem({currentorderitem}){

    // const pricedisplay = currentorderitem.price.toFixed(2);

    return (
      <li>
        <span>Order item to be returned here</span>
        {/* <span>{currentorderitem.quantity}</span> * <strong>{currentorderitem.item}</strong> : &pound;{pricedisplay} */}
      </li>
    )
  
}

export default OrderItem;