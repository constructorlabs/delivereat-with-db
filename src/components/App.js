import React from 'react';
import Menu from './Menu';
import Order from './Order';
import OrderAdmin from './OrderAdmin';

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      menu: {},
      currentOrder: null,
      order: {}
    }
    this.receiveItemOrder = this.receiveItemOrder.bind(this)
    this.removeItemOrder = this.removeItemOrder.bind(this)
    this.fetchMenu = this.fetchMenu.bind(this)
    this.sendOrderToApi = this.sendOrderToApi.bind(this)
    this.fetchOrders = this.fetchOrders.bind(this)
  }

   /* -- FETCH MENU -- */

   fetchMenu() {
    const api = "/api/menu/"
    fetch(api)
    .then(response => response.json())
    .then(content => {
      this.setState({menu: content});
    })
  }
  componentDidMount(){
    this.fetchMenu()
    this.fetchOrders()
  }
  receiveItemOrder(menuitem) {
    const updatedOrder = Object.assign({}, this.state.currentOrder, { [menuitem.id]: menuitem } )
    this.setState({currentOrder: updatedOrder})
  } 
  removeItemOrder(id) {
    // const array = [...this.state.currentOrder];
    // let index = array.indexOf(id);
    // array.splice(index, 1);
    // this.setState({currentOrder: array});
  }  

  /* -- FETCH (post) ORDER - */

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
        alert(`We are making stuff for you! Your order ID is ${order.orderId}`)
      });
  }

  /* -- FETCH ALL ORDERS - */
  fetchOrders() {
    const api = "/api/order/"
    fetch(api)
      .then(response => response.json())
      .then(content => {
        this.setState({order: content});
      })
  }

  render(){

    const currentOrderHasFood = this.state.currentOrder && Object.values(this.state.currentOrder).find(item => typeof item === "object");

      const currentOrderComponent =
      <Order 
      menu={this.state.menu}
      currentOrder={this.state.currentOrder}
      sendOrderToApi={this.sendOrderToApi}
      />

      const {menu, order} = this.state

    return (
      <div className="app container">
        <header className="masthead">
          <h1 className="masthead__title">Cullercoats Coffee</h1>
          <div className="masthead__description">
            <p>Where good coffee and grub meets geordie banter, run by brummie Matt. Down-to-earth fare, NOW any time, any where (in the North East).</p>
          </div>
        </header>

        { Object.values(menu).find(item => typeof item === "object") ? 
         <OrderAdmin 
            order={order}
            menu={menu}
          />
        : null }

        <main className="maincontent">
            <Menu 
            menu={this.state.menu}
            receiveItemOrder={this.receiveItemOrder} 
            removeItemOrder={this.removeItemOrder} 
            />

          <section className="customerOrder">
            <h2 className="customerOrder__title">Your Basket</h2>
            { currentOrderHasFood ? currentOrderComponent : <p>Your basket is empty</p>}
          </section>
          </main>

        </div>
    )
  }
}

export default App;
