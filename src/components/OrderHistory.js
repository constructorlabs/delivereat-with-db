import React from "react";

// import "../styles/OrderHistory.scss";

function OrderHistory(props) {
  const orders = props.orders;
  let idArray = orders.map(order => order.order_id);
  idArray = [...new Set(idArray)];

  function handleClick() {
    props.clearOrderHistory();
  }

  return (
    <div className="order__history">
      {idArray.map(id => {
        const itemsFromOneOrder = orders.filter(item => item.order_id == id);
        return (
          <ul>
            <li>Order ID {id}</li>
            {itemsFromOneOrder.map(item => {
              return (

                  <li>{item.name} {item.quantity}</li>

                
              );
            })}
          </ul>
        );
      })}
      <p onClick={handleClick}>Clear history</p>
    </div>
  );
}

export default OrderHistory;
