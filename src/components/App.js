import React from "react";
import Menu from "./Menu";
import Basket from "./Basket";
import OrderAdmin from "./OrderAdmin";

import "../styles/base/base.scss";
import "../styles/components/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: {},
      currentOrder: null,
      order: {}
    };
    this.fetchMenu = this.fetchMenu.bind(this);
    this.receiveItemOrder = this.receiveItemOrder.bind(this);
    this.removeItemFromOrder = this.removeItemFromOrder.bind(this);
    this.sendOrderToApi = this.sendOrderToApi.bind(this);
    this.fetchOrders = this.fetchOrders.bind(this);
  }

  /* -- RUN FETCHES -- */

  componentDidMount() {
    this.fetchMenu();
    this.fetchOrders();
  }

  /* -- MENU DATA -- */

  fetchMenu() {
    const api = "/api/menu/";
    fetch(api)
      .then(response => response.json())
      .then(content => {
        this.setState({ menu: content });
      });
  }

  /* -- ORDERS -- */
  receiveItemOrder(menuitem) {
    const updatedOrder = Object.assign({}, this.state.currentOrder, {
      [menuitem.id]: menuitem
    });
    this.setState({ currentOrder: updatedOrder });
  }

  removeItemFromOrder(menuItemId) {
    const menuitems = this.state.currentOrder;
    const menuItemsArray = Object.keys(menuitems);
    /* Logic to remove menuitem when item = menuItemId */
    let updatedOrderObj = menuItemsArray
      .filter(item => parseInt(item) !== menuItemId)
      .reduce((obj, item) => {
        obj[item] = menuitems[item];
        return obj;
      }, {});

    this.setState({ currentOrder: updatedOrderObj });
  }

  /* -- SUBMIT AN ORDER - */

  sendOrderToApi() {
    fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(this.state.currentOrder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(order => {
        this.setState({ currentOrder: null });
        alert(`We are making stuff for you! Your order ID is ${order.orderId}`);
      });
  }

  /* -- FETCH ALL ORDERS - */

  fetchOrders() {
    const api = "/api/order/";
    fetch(api)
      .then(response => response.json())
      .then(content => {
        this.setState({ order: content });
      });
  }

  render() {
    const { menu, order, currentOrder } = this.state;

    /* -- MENU COMPONENT - */
    const menuHasItems =
      menu && Object.values(menu).find(item => typeof item === "object");

    const menuComponent = (
      <Menu
        menu={menu}
        receiveItemOrder={this.receiveItemOrder}
        removeItemFromOrder={this.removeItemFromOrder}
      />
    );

    /* -- BASKET COMPONENT - */
    const currentOrderHasItems =
      currentOrder &&
      Object.values(currentOrder).find(item => typeof item === "object");

    const currentOrderComponent = (
      <Basket
        menu={menu}
        currentOrder={currentOrder}
        sendOrderToApi={this.sendOrderToApi}
        clearBasket={this.clearBasket}
      />
    );

    /* -- ORDER ADMIN COMPONENT - */
    const ordersExist = Object.values(menu).find(
      item => typeof item === "object"
    );

    const orderAdminComponent = <OrderAdmin order={order} menu={menu} />;

    return (
      <div className="app container">
        <header className="masthead">
          <h1 className="masthead__title">Cullercoats Coffee</h1>
          <div className="masthead__description">
            <p>
              Where good coffee and grub meets geordie banter, run by brummie
              Matt. Down-to-earth fare, NOW any time, any where (in the North
              East).
            </p>
          </div>
        </header>

        <main className="maincontent">
          {menuHasItems ? menuComponent : <p>Sorry. Closed for business!</p>}

          <section className="customerOrder">
            <h2 className="customerOrder__title">Your Basket</h2>
            {currentOrderHasItems ? (
              currentOrderComponent
            ) : (
              <p>Your basket is empty</p>
            )}
          </section>

          {ordersExist ? orderAdminComponent : <p>No Orders</p>}
        </main>
      </div>
    );
  }
}

export default App;
