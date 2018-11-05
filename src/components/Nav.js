import React from "react";

import "../styles/Nav.scss";
import cx from "classnames";


class Nav extends React.Component {
  constructor() {
    super();
  }

  render() {

    // const basketFull = cx("hidden", { "basket": this.props.showBasket });
    // let basketFull2 = cx("/static/img/basket.png", { "/static/img/basket_full.png": this.props.basketStatus });
    let basketFull = this.props.basketStatus === true ? "/static/img/basket_full.png": "/static/img/basket.png";


    return (
      <div className="nav">
        <img className="nav__logo" src="/static/img/logo.png" />
        <img className="nav__basket" onClick={() => this.props.openBasket()} src={basketFull}/>
      </div>
    );
  }
}

export default Nav;
