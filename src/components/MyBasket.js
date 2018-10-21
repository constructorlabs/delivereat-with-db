import React from "react";
import BasketItem from "./BasketItem";
import BasketDisplay from "./BasketDisplay";
import "../styles/MyBasket.scss";

class MyBasket extends React.Component {
  constructor() {
    super();
    this.state = {
      showBasket: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculation = this.calculation.bind(this);
    this.quantity = this.quantity.bind(this);

    this.showBasket = this.showBasket.bind(this);
  }

  handleSubmit() {
    this.props.receiveSubmit();
  }

  showBasket() {
    this.setState({
      showBasket: !this.state.showBasket
    });
  }

  calculation() {
    const costs = {
      subTotal: 0,
      deliveryFee: 0,
      total: 0
    };

    if (this.props.basket.length !== 0) {
      costs.subTotal = this.props.basket.reduce((acc, item) => {
        return (acc += item.price * item.quantity);
      }, 0);
      if (costs.subTotal >50){
        costs.deliveryFee=0
      } else{

        costs.deliveryFee = costs.subTotal * 0.2;
      }
      costs.total = costs.subTotal + costs.deliveryFee;

      return costs;
    } else {
      return costs;
    }
  }

  quantity(){

    let totalQuantity =0;

    if(this.props.basket.length !== 0){

      return totalQuantity=this.props.basket.reduce((acc, item) => {
        return (acc += item.quantity)
      },0)


    }else{
      return totalQuantity;
    }
  }

  render() {
    const costs = this.calculation();
    const totalQuantity = this.quantity();
    return (
      <div className="myBasket">
        <div className="basketItemsBottom">
        {this.state.showBasket ? (
          <p type="button" className="display" onClick={this.showBasket}>
            View basket
          </p>
        ) : (
          <div>
            <div className="basketItems">
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
              <BasketDisplay basket={this.props.basket} costs={costs} />
            </div>
            <p type="button" className="display" onClick={this.showBasket}>
              Hide basket
            </p>
          </div>
        )}
        <div className="checkout">
          <p>Total: £{costs.total}</p>

          <p type="button" onClick={this.handleSubmit}>
            Checkout
          </p>
            <p>Items: {totalQuantity}</p>
        </div>
        </div>
        <div className="basketItemsAside">
          <div className="basketItems">
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

          <BasketDisplay basket={this.props.basket} costs={costs} />
          </div>
          <div className="checkout">
            <p>Total: £{costs.total}</p>

            <p type="button" onClick={this.handleSubmit}>
              Checkout
            </p>
              <p>Items: {totalQuantity}</p>
          </div>
        </div>

      </div>
    );
  }
}

export default MyBasket;
