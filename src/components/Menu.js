import React from "react";
import Basket from "./Basket";

class Menu extends React.Component {
  constructor() {
    super();
    this.state = { basket: [] };
    this.getCourse = this.getCourse.bind(this);
    this.basketReceiveRemove = this.basketReceiveRemove.bind(this);
    this.basketReceiveAdd = this.basketReceiveAdd.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  basketReceiveAdd(id) {
    const existingItem = this.state.basket.find(element => {
      console.log(
        "addtihs",
        element.menuItemId === id ? element.menuItemId : "nope"
      );
      return element.menuItemId === id;
    });
    if (existingItem) {
      this.setState(
        {
          basket: this.state.basket.map(dish => {
            if (dish == existingItem) {
              return Object.assign({}, dish, { quantity: dish.quantity + 1 });
            } else {
              return dish;
            }
          })
        },
        () => console.log(this.state.basket)
      );
    } else {
      const item = { menuItemId: id, quantity: 1 };
      this.setState(
        {
          basket: this.state.basket.concat([item])
        },
        () => console.log(this.state.basket)
      );
    }
    this.calculate();
  }

  basketReceiveRemove(id) {
    const existingItem = this.state.basket.find(element => {
      return element.menuItemId === id;
    });
    if (existingItem) {
      this.setState(
        {
          basket: this.state.basket.map(dish => {
            if (dish == existingItem) {
              return Object.assign({}, dish, { quantity: dish.quantity - 1 });
            } else {
              return dish;
            }
          })
        },
        () => console.log(this.state.basket)
      );
    } else {
      const item = { menuItemId: id, quantity: 0 };
      this.setState(
        {
          basket: this.state.basket.concat([item])
        },
        () => console.log(this.state.basket)
      );
    }
    this.calculate();
  }

  //

  // basketSend(){

  // }

  getCourse(course) {
    return this.props.menu
      .filter(item => item.type === course)
      .map(foodItem => {
        return (
          <li key={foodItem.id}>
            <h1>{foodItem.name}</h1>
            <img src={foodItem.image} />
            <button onClick={() => this.basketReceiveAdd(foodItem.id)}>
              Order Me
            </button>
          </li>
        );
      });
  }

  calculate() {
    let delivery = 5;
    let calc = this.state.basket.map(order => {
      console.log({ order });
      console.log("woohooh", this.props.menu[order.menuItemId]);
      return (
        parseInt(this.props.menu[order.menuItemId - 1].price, 10) *
        order.quantity
      );
    });

    console.log(calc);
  }

  render() {
    return (
      <div>
        <ul className="menu">
          <h1>Brunch</h1>
          {this.getCourse("brunch")}

          <h1>Drinks</h1>
          {this.getCourse("drinks")}

          <h1>Dessert</h1>
          {this.getCourse("dessert")}
        </ul>

        <Basket
          basket={this.state.basket}
          menu={this.props.menu}
          receiveOrder={this.props.receiveOrder}
          basketReceiveRemove={this.basketReceiveRemove}
          basketReceiveAdd={this.basketReceiveAdd}
        />
      </div>
    );
  }
}

export default Menu;
