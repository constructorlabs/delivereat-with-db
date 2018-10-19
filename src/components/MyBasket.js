import React from "react";
import BasketItem from "./BasketItem";
import BasketCalcs from "./BasketCalcs";

class MyBasket extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    this.props.receiveSubmit()
  }

  render() {
    return (
      <div>
        <div>
          {this.props.basket
            ? this.props.basket.map(item => {
                return (
                  <BasketItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    receivePlusQuantity={this.props.receivePlusQuantity}
                    receiveMinusQuantity={this.props.receiveMinusQuantity}
                  />
                );
              })
            : null}
        </div>

        <BasketCalcs basket={this.props.basket}/>
        <p type="button" onClick={this.handleSubmit}>Checkout</p>
      </div>
    );
  }
}

export default MyBasket;
