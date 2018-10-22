import React from "react";
import Food from "./Food";
import "../styles/Menu.scss";


class Menu extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="menu">
        {this.props.menu.map(item => {
          return (
            <Food
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image_name}
              basket={this.props.basket}
              receiveAddToBasket={this.props.receiveAddToBasket}
              receiveRemoveFromBasket={this.props.receiveRemoveFromBasket}
            />
          );
        })}
      </div>
    );
  }
}

export default Menu;
