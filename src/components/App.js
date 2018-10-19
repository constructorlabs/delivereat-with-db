import React from "react";
import Menu from "./Menu";
import MyBasket from "./MyBasket";

import "../styles/App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      order: [],
      basket: []
    };

    this.receiveAddToBasket = this.receiveAddToBasket.bind(this);
    this.receiveRemoveFromBasket = this.receiveRemoveFromBasket.bind(this);
    this.receivePlusQuantity = this.receivePlusQuantity.bind(this);
    this.receiveMinusQuantity = this.receiveMinusQuantity.bind(this);
    this.receiveSubmit = this.receiveSubmit.bind(this);
  }

  componentDidMount() {
    const localBasketString = window.localStorage.getItem("basket");
    const localBasket = !localBasketString ? [] : JSON.parse(localBasketString);

    fetch("/menu")
      .then(response => response.json())
      .then(body => {
        this.setState({
          menu: body,
          basket: localBasket
        });
      });
  }

  receiveAddToBasket(itemId) {
    const orderItem = this.state.menu.find(item => item.id == itemId);
    orderItem.quantity = 1;

    this.setState(
      {
        basket: this.state.basket.concat(orderItem)
      },
      () => localStorage.setItem("basket", JSON.stringify(this.state.basket))
    );
  }

  receiveRemoveFromBasket(itemId) {
    this.setState(
      {
        basket: this.state.basket.filter(item => item.id !== itemId)
      },
      () => localStorage.setItem("basket", JSON.stringify(this.state.basket))
    );
  }

  receivePlusQuantity(itemId) {
    const updatedBasket = this.state.basket.map(item => {
      if (item.id == itemId) {
        item.quantity += 1;
        return item;
      } else {
        return item;
      }
    });
    this.setState({
      basket: updatedBasket
    },() => localStorage.setItem("basket", JSON.stringify(this.state.basket)));
  }

  receiveMinusQuantity(itemId) {
    const updatedBasket = this.state.basket
      .map(item => {
        if (item.id == itemId) {
          item.quantity -= 1;
          return item;
        } else {
          return item;
        }
      })
      .filter(item => item.quantity !== 0);
    this.setState({
      basket: updatedBasket
    },() => localStorage.setItem("basket", JSON.stringify(this.state.basket)));
  }

  receiveSubmit() {
    const orderDetails = this.state.basket.map(item => {
      return {
        menu_id: item.id,
        quantity: item.quantity
      };
    });


    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(orderDetails)
    })
      .then(response => response.json())
      .then(body => {
        alert(`Order is accepted with id ${body.order_id}`);
        this.setState(
          {
            basket: []
          },
          () =>
            localStorage.setItem("basket", JSON.stringify(this.state.basket))
        );
      })
      .catch(error => {
        error: error.message;
      });
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Food Heaven</h1>
        <Menu
          menu={this.state.menu}
          basket={this.state.basket}
          receiveAddToBasket={this.receiveAddToBasket}
          receiveRemoveFromBasket={this.receiveRemoveFromBasket}
        />
        <MyBasket
          basket={this.state.basket}
          receiveSubmit={this.receiveSubmit}
          receivePlusQuantity={this.receivePlusQuantity}
          receiveMinusQuantity={this.receiveMinusQuantity}
        />
      </div>
    );
  }
}

export default App;
