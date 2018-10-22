//Twilio account SID: AC4aa5aaed7956695d853be993384216c4
//Aut token: e4bb147560948f6101250d01cb2fcaf8
//Twilio Service Instance SID: IS925fb186c8a3c96ee666e12c259eddee

import React from "react";
import Menu from "./Menu";
import MyBasket from "./MyBasket";
import User from "./User";
import OrderHistory from "./OrderHistory";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
library.add(faBars);
import "../styles/App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      orders: [],
      basket: {},
      userDetails: {},
      displayUserForm: false,
      displayOrderHistory: false
    };

    this.receiveAddToBasket = this.receiveAddToBasket.bind(this);
    this.receiveRemoveFromBasket = this.receiveRemoveFromBasket.bind(this);
    this.receivePlusQuantity = this.receivePlusQuantity.bind(this);
    this.receiveMinusQuantity = this.receiveMinusQuantity.bind(this);
    this.receiveSubmit = this.receiveSubmit.bind(this);
    this.receiveUserDetails = this.receiveUserDetails.bind(this);
    this.displayOrderHistory = this.displayOrderHistory.bind(this);
    this.clearOrderHistory = this.clearOrderHistory.bind(this);
  }

  componentDidMount() {
    const localBasketString = window.localStorage.getItem("basket");
    const localBasket = !localBasketString ? {} : JSON.parse(localBasketString);

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
    let updatedBasket = this.state.basket;
    updatedBasket[itemId] = orderItem;

    this.setState(
      {
        basket: updatedBasket
      },
      () => localStorage.setItem("basket", JSON.stringify(this.state.basket))
    );
  }

  receiveRemoveFromBasket(itemId) {
    let updatedBasket = this.state.basket;
    delete updatedBasket[itemId];

    this.setState(
      {
        basket: updatedBasket
      },
      () => localStorage.setItem("basket", JSON.stringify(this.state.basket))
    );
  }

  receivePlusQuantity(itemId) {
    let updatedBasket = this.state.basket;
    updatedBasket[itemId].quantity += 1;

    this.setState(
      {
        basket: updatedBasket
      },
      () => localStorage.setItem("basket", JSON.stringify(this.state.basket))
    );
  }

  receiveMinusQuantity(itemId) {
    let updatedBasket = this.state.basket;
    updatedBasket[itemId].quantity -= 1;
    const deleteKeys = Object.keys(updatedBasket).filter(
      key => updatedBasket[key].quantity == 0
    );
    delete updatedBasket[deleteKeys];

    this.setState(
      {
        basket: updatedBasket
      },
      () => localStorage.setItem("basket", JSON.stringify(this.state.basket))
    );
  }

  receiveUserDetails(userDetails) {
    this.setState(
      {
        userDetails: userDetails,
        displayUserForm: false
      },
      () => this.receiveSubmit()
    );
  }

  receiveSubmit() {
    if (Object.values(this.state.userDetails).length == 0) {
      this.setState({
        displayUserForm: true
      });
    } else {
      let orderDetails = {};
      orderDetails.user = this.state.userDetails;
      orderDetails.items = {};

      Object.keys(this.state.basket).map(id => {
        return (orderDetails.items[id] = {
          menu_id: id,
          quantity: this.state.basket[id].quantity
        });
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
              basket: {},
              userDetails: {}
            },
            () =>
              localStorage.setItem("basket", JSON.stringify(this.state.basket))
          );
        })
        .catch(error => {
          error: error.message;
        });

      this.setState({
        displayUserForm: false
      });
    }
  }

  displayOrderHistory() {
    fetch("/order")
      .then(response => response.json())
      .then(body => {
        this.setState({
          orders: body,
          displayOrderHistory: !this.state.displayOrderHistory
        });
      });
  }

  clearOrderHistory() {
    fetch("/order", {
      method: "delete"
    })
      .then(response => response.json())
      .catch(error => {
        error: error.message;
      });
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Food Heaven</h1>
        <div className="history">
          {this.state.displayOrderHistory ? (
            <p type="button" onClick={this.displayOrderHistory}>
              Hide history
            </p>
          ) : (
            <p type="button" onClick={this.displayOrderHistory}>
              Order history
            </p>
          )}
          <FontAwesomeIcon
            className="icon"
            icon="bars"
            onClick={this.displayOrderHistory}
          />
          {this.state.displayOrderHistory ? (
            <OrderHistory
              orders={this.state.orders}
              clearOrderHistory={this.clearOrderHistory}
            />
          ) : null}
        </div>

        <Menu
          className="menu"
          menu={this.state.menu}
          basket={this.state.basket}
          receiveAddToBasket={this.receiveAddToBasket}
          receiveRemoveFromBasket={this.receiveRemoveFromBasket}
        />
        <MyBasket
          className="myBasket"
          basket={this.state.basket}
          receiveSubmit={this.receiveSubmit}
          receivePlusQuantity={this.receivePlusQuantity}
          receiveMinusQuantity={this.receiveMinusQuantity}
        />
        {this.state.displayUserForm ? (
          <User
            receiveUserDetails={this.receiveUserDetails}
            displayUserForm={this.state.displayUserForm}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
