import React from "react";

class TotalPrice extends React.Component {
  constructor() {
    super();
    // this.state = {
    //     totalPrice: 0
    // }
    this.handleClick = this.handleClick.bind(this);
    // this.fetchCurrentBasket = this.fetchCurrentBasket.bind(this);
  }

  handleClick() {
    let items = [];
    {
      this.props.currentBasket.forEach(item => {
        items.push({ item_id: item.id, quantity: item.quantity });
      });
    }
    let basketToServer = Object.assign(
      {},
      { items: items },
      { details_of_order: "Mario, 012345678, please kock 3 times" }
    );

    fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(basketToServer)
    })
      .then(response => {
        // console.log(response);

        return response.json();
      })
      .then(body => {
        alert(body.orderId);
        // this.setState({
        //   menuItems: body
      });

    this.props.clearBasket();
  }

  // fetchCurrentBasket() {
  //     fetch('/basket')
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((body) => {
  //           console.log(body);
  //       });
  //   }

  render() {
    // console.log(this.props.currentBasket);

    return (
      <div className="totalPrice container">
        <button className="totalPrice__button" onClick={this.handleClick}>
          £{this.props.totalprice} ({this.props.quantity}) + delivery:{" "}
          {this.props.deliveryCharge}
        </button>
      </div>
    );
  }
}

export default TotalPrice;
