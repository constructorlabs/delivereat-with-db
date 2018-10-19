import React from 'react';
import Menu from './Menu.js'
import Header from './Header.js'
import SeeOrder from './SeeOrder.js'
import OrderReview from './OrderReview.js'
import OrderConfirmation from './OrderConfirmation.js'
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super()

    this.getMenu = this.getMenu.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.changeDisplay = this.changeDisplay.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.amendQuantity = this.amendQuantity.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)
    this.placeOrder = this.placeOrder.bind(this)


    this.state = {
      mostPopular: {},
      menu: {},
      order: {},
      placedOrder: {},
      display: 'menu' ///'menu' or 'order' or 'confirmation'
    }


}
  componentDidMount(){
  this.getMenu()
}


  arrayToObject(array){
    return array.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})
  }


  getMenu(){
    fetch('/api/menu/')
      .then(response => response.json())
      .then(body => {
        console.log(body)
        const menuObject = this.arrayToObject(body[0])
        const popularObject = this.arrayToObject(body[1])
        this.setState({
          menu: menuObject,
          mostPopular: popularObject
        })
      })
  }

  placeOrder(){
    const order = this.state.order
    fetch('/api/orders', {
      method: 'post',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          order: {},
          placedOrder: body
        })
        this.changeDisplay('confirmation')
      })
  }


  addToOrder(menuItem, quantity){
    if (!this.state.order[menuItem.id]){
      const orderItem = {
        [menuItem.id]: {
          id: menuItem.id,
          quantity
        }
      }
      this.setState({
        order: Object.assign({}, this.state.order, orderItem)
      })
    }else{
      const currentQuantity = this.state.order[menuItem.id].quantity
      this.amendQuantity(menuItem, currentQuantity + 1)
    }
  }

  removeFromOrder(menuItem){
    const order = this.state.order
    delete order[menuItem.id]
    this.setState({
      order
    })
  }

  amendQuantity(menuItem, quantity){
    const order = this.state.order
    order[menuItem.id].quantity = Number(quantity)
    this.setState({
      order
    })
  }

  calculateTotal(){
    const total = Object.values(this.state.order).reduce((acc, item) => {
      return acc + (item.quantity * this.state.menu[item.id].price)
    }, 0)
    return total.toFixed(2)

  }

  changeDisplay(display){
    this.setState({
      display
    })
  }

  render(){
    return (
      <div>
      <Header changeDisplay={this.changeDisplay} />
        {this.state.display === 'menu'
          ? <Menu addToOrder={this.addToOrder} menu={this.state.menu} mostPopular={this.state.mostPopular}/>
          : null
        }

        {this.state.display === 'order'
          ? <OrderReview menu={this.state.menu}
                         order={this.state.order}
                         amendQuantity={this.amendQuantity}
                         calculateTotal={this.calculateTotal}
                         removeFromOrder={this.removeFromOrder}
                         placeOrder={this.placeOrder}/>
          : null
        }

        {this.state.display === 'confirmation'
          ? <OrderConfirmation placedOrder={this.state.placedOrder}/>
          : null
        }



        {Object.values(this.state.order).length && this.state.display === 'menu'
          ? <SeeOrder changeDisplay={this.changeDisplay} calculateTotal={this.calculateTotal}/>
          : null
        }
      </div>
    )
  }
}

export default App;
