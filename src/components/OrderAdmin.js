import React from "react";
import OrderAdminItem from "./OrderAdminItem";

function OrderAdmin({ order, menu }) {

  console.log(order)

  const newOrder = Object.values(order).reduce((acc, orderItem) => {
    const val = orderItem.order_id
    acc[val] = acc[val] || []
    acc[val].push({
      orderId: orderItem.order_id,
      name: menu[orderItem.menu_id].name,
      price: menu[orderItem.menu_id].price,
      quantity: orderItem.quantity
    })
    return acc
  }, {})

  console.log(newOrder)
  
  // const forOutput = Object.values(newOrder).map((order, i) => (
  //   order
  //   // console.log(order[0].orderId)
  // ))
  // console.log(forOutput)

  // const results = Object.values(order).map(orderItem => ({
  //   orderId: orderItem.order_id,
  //   name: menu[orderItem.menu_id].name,
  //   price: menu[orderItem.menu_id].price,
  //   quantity: orderItem.quantity
  // }));

  return (
    <ul className="menu menu--settings">
      <h2>Orders</h2>
      {/* {results.map((order, i) => (
        <OrderAdminItem orderItem={order} key={i} />
      ))} */}
    </ul>
  );
}

export default OrderAdmin;
