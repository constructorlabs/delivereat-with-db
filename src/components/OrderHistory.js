import React from "react";

// import "../styles/OrderHistory.scss";

function OrderHistory(props) {
  const orders = props.orders;


  function handleClick(){
    props.clearOrderHistory()
  }

  return (
    <div className="order__history">




      {orders.filter()
        .map(eachOrder => {

        return (
          <ul>
            <li>#{eachOrder.order_id}</li>
            {/* {orders.filter(item => {
              item.order_id == eachOrder.order_id
              return <li>{item.name}</li>
            })
              } */}
          </ul>

        )}
      )}
      <p onClick={handleClick}>Clear history</p>
    </div>
  );
}

export default OrderHistory;
