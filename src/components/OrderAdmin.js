import React from "react";
import OrderAdminItem from "./OrderAdminItem";
import '../styles/components/orderadmin.scss';


function OrderAdmin({ order, menu }) {
  const results = Object.values(order).map(orderItem => ({
    orderId: orderItem.order_id,
    name: menu[orderItem.menu_id].name,
    price: menu[orderItem.menu_id].price,
    quantity: orderItem.quantity,
    subtotal: orderItem.quantity * menu[orderItem.menu_id].price
  }));

  // IN PROGRESS
  // const newOrder = Object.values(order).reduce((acc, orderItem) => {
  //   const val = orderItem.order_id
  //   acc[val] = acc[val] || []
  //   acc[val].push({
  //     orderId: orderItem.order_id,
  //     name: menu[orderItem.menu_id].name,
  //     price: menu[orderItem.menu_id].price,
  //     quantity: orderItem.quantity,
  //   })
  //   return acc
  // }, {})

          {/* { Object.values(newOrder).map(array => {
        return array.map(obj => {
          return Object.keys(obj).map(item => {
          // console.log(`${item} -> ${obj[item]}`);
          return <li>{`${item} -> ${obj[item]}`}</li>
        })
        })
      })} */}

  
  return (
    <section className="admin">
    <ul className="admin__menu menu--settings">
      <h2 className="admin__title">Orders</h2>
      {results.map((order, i) => (
        <OrderAdminItem order={order} key={i} />
      ))}
    </ul>
    </section>
  );
}

export default OrderAdmin;
