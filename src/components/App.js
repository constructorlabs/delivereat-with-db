import React from "react";
import Menu from "./Menu";

import "../styles/App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menuItems: [],
      customerDetails: {
        name: "Chris",
        address: "Dekker House",
        postcode: "E8 3FS",
        email: "chrisphillers@gmail.com",
        phone: "07714205581"
      }
    };
    this.fetchMenuItems = this.fetchMenuItems.bind(this);
    this.receiveOrder = this.receiveOrder.bind(this);
  }

  componentDidMount() {
    this.fetchMenuItems();
    this.postOrder();
  }

  receiveOrder(orderBasket) {
    const finalOrder = {
      items: orderBasket,
      ...this.state.customerDetails
    };
    console.log({ finalOrder });
    this.postOrder(finalOrder);
  }

  fetchMenuItems() {
    fetch("/api/menu")
      .then(res => res.json())
      .then(body => {
        this.setState({ menuItems: body });
        console.log(this.state.menuItems);
      });
  }

  postOrder(currentOrder) {
    fetch("/api/order", {
      method: "post",
      body: JSON.stringify(currentOrder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log(data);
        // handle response
      });
  }

  render() {
    return (
      <div>
        Delivereat app
        <Menu menu={this.state.menuItems} receiveOrder={this.receiveOrder} />
      </div>
    );
  }
}

export default App;
