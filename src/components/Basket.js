import React from 'react';
import BasketItem from './BasketItem';
import '../styles/components/basket.scss';

function Basket({ menu, currentOrder, sendOrderToApi}) {
  
  const orderItems = [];
  const orderValues = Object.values(currentOrder);
  
    orderValues.map(val => {
      const menuId = val.id;
      const name = menu[menuId].name;
      const quantity = val.quantity;
      const price = menu[menuId].price;
      
        orderItems.push({
        id: val.id,
        name: name,
        price: price,
        quantity: quantity,
        subtotal: price * quantity
      });
    })
   
   /* delivery and calculations */
    const totalPrice = orderItems.reduce((acc, item) => acc + item.subtotal, 0); 
    const deliveryCharge = (totalPrice >= 10) ? 0 : 2.95;
    const deliveryText = (totalPrice >= 10) ? 'YAY! Free delivery' : 'Delivery charge';
    
    const ordersRendered = Object.values(orderItems).map(orderItem => {
      return <BasketItem
      orderItem={orderItem} 
      key={orderItem.id} 
       />
    })
 
   return (
        <ul className="customerOrder__order menu--settings">
          {ordersRendered}
          <li><em>&pound;10&#43; qualifies for free delivery</em></li>
          <li>{deliveryText} &pound;{(deliveryCharge).toFixed(2)}</li>
          <li><strong>Order Total: &pound;{(deliveryCharge + totalPrice).toFixed(2)}</strong></li>
          <li>
          <button className="customerOrder__submit" onClick={sendOrderToApi} type="submit">Place order</button>
          </li>
        </ul>
        )
  }
export default Basket;

