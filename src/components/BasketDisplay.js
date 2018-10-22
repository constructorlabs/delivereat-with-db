import React from "react";
import "../styles/BasketDisplay.scss";

class BasketDisplay extends React.Component {
  constructor() {
    super();


  }


  render() {
    const { subTotal, deliveryFee, total } = this.props.costs;



    return (
      <div className="calcs">
        <p>Subtotal: £{subTotal.toFixed(2)}</p>
        {deliveryFee!==0?
        <p>Delivery Fee: £{deliveryFee.toFixed(2)}</p>
        : <p>Free delivery</p>}
        <p>Total: £{total.toFixed(2)}</p>

      </div>
    );
  }
}

export default BasketDisplay;
