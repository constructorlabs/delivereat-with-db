import React from "react";


class BasketCalcs extends React.Component{

  constructor(){
    super();

    this.calculation = this.calculation.bind(this);
  }

  calculation(){
    const costs={
   subTotal:0,
   deliveryFee:0,
   total:0
 };
    if( this.props.basket.length !== 0) {
      costs.subTotal=this.props.basket.reduce((acc, item) => {
        return acc += item.price * item.quantity
      }, 0);
      costs.deliveryFee = costs.subTotal * 0.2;
      costs.total = costs.subTotal + costs.deliveryFee;
      return costs
    } else {
      return costs


    }

  }


  render(){
    const {subTotal, deliveryFee, total}=this.calculation()

    return (
      <div>
        <p>Subtotal: £{subTotal.toFixed(2)}</p>
        <p>Delivery Fee: £{deliveryFee.toFixed(2)}</p>
        <p>Total: £{total.toFixed(2)}</p>
      </div>
    );

  }

}


export default BasketCalcs;
