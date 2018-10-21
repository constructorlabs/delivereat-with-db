import React from "react";
import Menu from "./Menu";
import Nav from "./Nav";

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
      },
      showBasket: false
    };
    this.fetchMenuItems = this.fetchMenuItems.bind(this);
    this.receiveOrder = this.receiveOrder.bind(this);
    this.closeBasket = this.closeBasket.bind(this);
    this.openBasket = this.openBasket.bind(this);
  }

  componentDidMount() {
    this.fetchMenuItems();
   
  }

  openBasket(){
    this.setState({showBasket: true});
  }

  closeBasket() {
    this.setState({ showBasket: false });
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
        <Nav  openBasket={this.openBasket}/>
        <div className="main">
          <div className="header" />
        </div>
        <Menu menu={this.state.menuItems} receiveOrder={this.receiveOrder} closeBasket={this.closeBasket} showBasket={this.state.showBasket} />
      </div>
    );
  }
}

export default App;
