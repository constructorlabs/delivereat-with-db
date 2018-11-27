import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Splash from './Splash';
import Menu from './Menu';
import Basket from './Basket';
import Checkout from './Checkout';
import '../styles/App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      stage: 'splash',
      menu: '',
      order: {
        id: '',
        items: [],
        phone: '',
      },
      readyToCheckout: false,
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.checkout = this.checkout.bind(this);
    this.changeStage = this.changeStage.bind(this);
    this.getInput = this.getInput.bind(this);
  }

  componentDidMount() {
    fetch('/api/menu')
      .then((response) => response.json())
      .then((menu) => this.setState({ menu }));
  }

  getInput(text) {
    const { readyToCheckout } = this.state;
    if (text[0] !== '0' && text.length === 10 && !Number.isNaN(text)) {
      if (!readyToCheckout) {
        this.setState((prevState) => ({
          readyToCheckout: true,
          order: Object.assign({}, prevState.order, { phone: `+44${text}` }),
        }));
      }
    } else {
      this.setState((prevState) => ({
        readyToCheckout: false,
        order: Object.assign({}, prevState.order, { phone: '' }),
      }));
    }
  }

  checkout() {
    if (this.state.readyToCheckout) {
      fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify(this.state.order),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((response) => {
          this.setState({
            stage: 'checkout',
            order: {
              id: response,
              items: [],
              phone: '',
            },
            readyToCheckout: false,
          });
          console.log('Success:', JSON.stringify(response));
        })
        .catch((error) => console.error('Error:', error));
    }
  }

  removeFromOrder(menuItemId) {
    const { items } = this.state.order;
    items
      .map((item) => {
        if (item[0] === menuItemId) {
          return [item[0], item[1] - 1];
        }
        return item;
      })
      .filter((item) => item[1] !== 0);
    if (!items.length) {
      this.setState({ stage: 'menu' });
    }
    this.setState({ order: { items } });
  }

  addToOrder(menuItemId) {
    let { items } = this.state.order;
    if (items.length === 0) {
      items = [[menuItemId, 1]];
    } else if (!items.map((item) => item[0]).includes(menuItemId)) {
      items.push([menuItemId, 1]);
    } else {
      items = items.map((item) => {
        if (item[0] === menuItemId) {
          return [item[0], item[1] + 1];
        }
        return item;
      });
    }
    this.setState({ order: { items } });
  }

  calculateTotal(order) {
    const { menu } = this.state;
    const total = order.length
      ? order
        .map(
          (orderItem) =>
            menu.find((menuItem) => menuItem.id === orderItem[0]).price * orderItem[1],
        )
        .reduce((a, b) => a + b)
      : 0;
    return total;
  }

  changeStage(stage) {
    this.setState({ stage });
  }

  render() {
    const { stage } = this.state;
    const total = this.calculateTotal(this.state.order.items);

    return (
      <div className="app">
        <CSSTransitionGroup
          transitionName="splash-transition"
          transitionAppear
          transitionAppearTimeout={300}
          transitionLeave
          transitionLeaveTimeout={300}
          transitionEnter={false}
        >
          {stage === 'splash' && <Splash changeStage={this.changeStage} />}
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="menu-transition"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {(stage === 'menu' || stage === 'basket') && (
            <div className="main">
              <div className="header">
                <p className="header__logo">Zing</p>
              </div>
              <div className="content">
                {this.state.menu && (
                  <Menu
                    stage={stage}
                    order={this.state.order}
                    menu={this.state.menu}
                    addToOrder={this.addToOrder}
                    removeFromOrder={this.removeFromOrder}
                  />
                )}
                <CSSTransitionGroup
                  transitionName="basket-transition"
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={200}
                >
                  {!!this.state.order.items.length && (
                    <Basket
                      total={total}
                      stage={stage}
                      menu={this.state.menu}
                      changeStage={this.changeStage}
                      order={this.state.order}
                      addToOrder={this.addToOrder}
                      removeFromOrder={this.removeFromOrder}
                      checkout={this.checkout}
                      getInput={this.getInput}
                      readyToCheckout={this.state.readyToCheckout}
                    />
                  )}
                </CSSTransitionGroup>
              </div>
            </div>
          )}
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="checkout-transition"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {stage === 'checkout' && (
            <Checkout orderId={this.state.order.id} changeStage={this.changeStage} />
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default App;
