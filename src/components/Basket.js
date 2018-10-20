import React from "react";

class Basket extends React.Component {
  constructor() {
    super();
    this.state = { order: {} };
  }

  render() {
    console.log(this.props.basket);

    return (
      <div>
        <ul className="basket">
          {this.props.basket.map(item => {
            return (
              <li key={item.menuItemId}>
                <p>{item.menuItemId}</p>

                <span>
                  <button
                    onClick={() => {
                      this.props.basketReceiveRemove(item.menuItemId);
                    }}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => {
                        console.log({item})
                      this.props.basketReceiveAdd(item.menuItemId);
                    }}
                  >
                    +
                  </button>
                </span>

                {/* {this.props.menu[item.menuItemId].name} 
                   {this.props.menu[item.menuItemId].price * item.quantity} */}
              </li>
            );
          })}
        </ul>
        <button onClick={() => this.props.receiveOrder(this.props.basket)}>
          Place Order
        </button>
      </div>
    );
  }
}

export default Basket;
