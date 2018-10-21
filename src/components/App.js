import React from 'react';
import Menu from './Menu.js'
import MenuItem from './MenuItem.js'
import Header from './Header.js'
import SeeOrder from './SeeOrder.js'
import OrderReview from './OrderReview.js'
import OrderConfirmation from './OrderConfirmation.js'
import MaximisedMenuItem from './MaximisedMenuItem.js'
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
    this.addTopping = this.addTopping.bind(this)


    this.state = {
      mostPopular: {},
      menu: {},
      toppings: {},
      order: {},
      placedOrder: {},
      viewing: {},
      display: 'menu' ///'menu' or 'order' or 'confirmation' or 'maximised'
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
        const toppings = this.arrayToObject(body[2])
        this.setState({
          menu: menuObject,
          mostPopular: popularObject,
          toppings
        })
      })
      console.log
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


  addToOrder(menuItem, toppings, quantity){
    if (!this.state.order[menuItem.id]){
      const orderItem = {
        [menuItem.id]: {
          id: menuItem.id,
          quantity,
          toppings
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

  calculateItemTotal(){

  }

  calculateTotal(){
    const total = Object.values(this.state.order).reduce((acc, item) => {
      const toppingsPrice = item.toppings.reduce((acc, item) => {
        return acc + (item.quantity * this.state.toppings[item.toppingId].price)
      }, 0)
      return acc + (item.quantity * this.state.menu[item.id].price + toppingsPrice)
    }, 0)
     return total.toFixed(2)

  }

  changeDisplay(display, menuItem = null){
    display === 'maximised'
    ? (this.setState({
      display,
      viewing: {baseItem: menuItem,
                toppings: []}
    }))
    : (this.setState({
      display
    }))
  }

  addTopping(baseItem, toppingItem){
    const itemWithToppings = {
      baseItem: this.state.viewing.baseItem,
      toppings: this.state.viewing.toppings.concat({toppingId: toppingItem.id, quantity: 1})
    }
    this.setState({
      viewing: itemWithToppings
    })
  }

  render(){
    return (
      <div>
      {this.state.display !== 'maximised'
        ? <Header changeDisplay={this.changeDisplay} />
        : null
      }

        {this.state.display === 'menu'
          ? <Menu addToOrder={this.addToOrder} menu={this.state.menu} mostPopular={this.state.mostPopular} changeDisplay={this.changeDisplay}/>
          : null
        }

        {this.state.display === 'maximised'
          ? <MaximisedMenuItem maximised={true} viewing={this.state.viewing} toppings={this.state.toppings} addTopping={this.addTopping} addToOrder={this.addToOrder}/>
          : null
        }

        {this.state.display === 'order'
          ? <OrderReview menu={this.state.menu}
                         order={this.state.order}
                         toppings={this.state.toppings}
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



        {Object.values(this.state.order).length && this.state.display === 'maximised'
          ? <SeeOrder changeDisplay={this.changeDisplay} calculateTotal={this.calculateTotal}/>
          : null
        }
      </div>
    )
  }
}

export default App;
