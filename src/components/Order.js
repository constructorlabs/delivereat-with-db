import React from 'react';
import OrderItem from './OrderItem';

function Order({ menu, currentOrder, sendOrderToApi }) {
  
  let orderItems = [];
  let orderValues = Object.values(currentOrder);
  
    orderValues.forEach(val => {
      const menuId = val.id;
      const name = menu[menuId].name;
      const quantity = val.quantity;
      const price = menu[menuId].price;
      console.log(`id: ${menuId}, quantity: ${quantity}, price: ${price}, subtotal: &pound;${price * quantity} `);
  
      orderItems.push({
        id: val.id,
        name: name,
        price: price,
        quantity: quantity,
        subtotal: price * quantity
      });
    })
   
   // reducer for total
    let totalPrice = orderItems.reduce((acc, item) => {
      return acc + item.subtotal
    }, 0); 
    let orderPlusDelivery = totalPrice + 3;
    
    let ordersRendered = Object.values(orderItems).map(orderItem => {
      return <OrderItem
      orderItem={orderItem} 
      key={orderItem.id} 
       />
    })
 
   
   return (
        <ul className="customerOrder__order menu--settings">
          {ordersRendered}
          <li>Delivery charge &pound;3</li>
          <li><strong>Total:&pound;{orderPlusDelivery}</strong></li>
          <li>
          <button className="customerOrder__submit" onClick={sendOrderToApi} type="submit">Place order</button>
          </li>
        </ul>
        )
  }
export default Order;

