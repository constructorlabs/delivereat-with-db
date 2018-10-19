import React from 'react';
import Splash from './Splash';
import Menu from './Menu';
import Basket from './Basket';
import Checkout from './Checkout';
import { CSSTransitionGroup } from 'react-transition-group';
import '../styles/App.scss';

class App extends React.Component {

  constructor(){

    super();

    this.state = {stage: 'splash',
                  menu: '',
                  order: {
                    id: '',
                    items: [],
                    phone: '' },
                  readyToCheckout: false};

    this.addToOrder = this.addToOrder.bind(this); 
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.checkout = this.checkout.bind(this);
    this.changeStage = this.changeStage.bind(this);
    this.getInput = this.getInput.bind(this);
  }

  componentDidMount() {
    fetch('/api/menu')
    .then(response => response.json())
    .then(menu => this.setState({menu}));
  }

  changeStage(stage) {
    this.setState({stage});
  }

  calculateTotal(order) {
    const menu = this.state.menu;
    const total = (order.length) ? order
    .map(orderItem => menu.find(menuItem => menuItem.id === orderItem[0]).price * orderItem[1])
    .reduce((a,b) => (a+b)) : 0;
    return total;
  }

  addToOrder(menuItemId) {
    let items = this.state.order.items;
    if (items.length === 0) {
      items = [[menuItemId, 1]];
    } else if (!items.map(item => item[0]).includes(menuItemId)) {
      items.push([menuItemId,1]);
    } else {
      items = items.map(item => {
        if (item[0] === menuItemId) {
          return [item[0],item[1] + 1];
        } else {
          return item;
        }})}
    this.setState({order: {items}});
  }

  removeFromOrder(menuItemId) {
    const items = this.state.order.items
    .map(item => {
      if (item[0] === menuItemId) {
        return [item[0], item[1] - 1];
      } else {
        return item;
      }})
    .filter(item => item[1] !== 0);
    if (!items.length) {
      this.setState({stage: 'menu'});
    }
    this.setState({order: {items}});
  }

  checkout() {
    if (this.state.readyToCheckout) {
      fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify(this.state.order),
        headers: {'Content-Type': 'application/json'}})
      .then(res => res.json())
      .then(response => {
        this.setState({ stage: 'checkout',
                        order: {
                          id: response,
                          items: [],
                          phone: ''},
                        readyToCheckout: false });
        console.log('Success:', JSON.stringify(response));
      })
      .catch(error => console.error('Error:', error)); 
    }
  }

  getInput(text) {
    const readyToCheckout = this.state.readyToCheckout;
    if (text[0] !== '0' && text.length === 10 && !isNaN(text)) {
      if (!readyToCheckout) {
        const order = Object.assign({}, this.state.order, {phone: '+44' + text});
        this.setState({readyToCheckout: true,
                       order});
      }
    } else {
      if (readyToCheckout) {
        const order = Object.assign({}, this.state.order, {phone: ''});
        this.setState({readyToCheckout: false,
                       order});
      }
    }
  }
  
  render() {
    const stage = this.state.stage;
    const total = this.calculateTotal(this.state.order.items);

    return (
      <div className='app'>
        {(stage === 'splash') && 
        <Splash 
          changeStage={this.changeStage}/>}
        {(stage === 'menu' || stage === 'basket') &&
        <div className='main'>
          <div className='header'>
            <p className='header__logo'>Zing</p>
          </div>
          <div className='content'>
            {(this.state.menu) && 
            <Menu 
              stage={stage} 
              order={this.state.order} 
              menu={this.state.menu} 
              addToOrder={this.addToOrder} 
              removeFromOrder={this.removeFromOrder}/>}
            {(!!this.state.order.items.length) && 
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
              readyToCheckout={this.state.readyToCheckout}/>}
          </div>
        </div>}
        {(stage === 'checkout') && 
        <Checkout 
          orderId={this.state.order.id}
          changeStage={this.changeStage}/>}
      </div>
    );
  }
}

export default App;