import React from 'react';
import Menu from './Menu.js'
import SeeOrder from './SeeOrder.js'
import OrderReview from './OrderReview.js'
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super()

    this.getMenu = this.getMenu.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.changeDisplay = this.changeDisplay.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.amendQuantity = this.amendQuantity.bind(this)


    this.state = {
      menu: {},
      order: {},
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
        const bodyObject = this.arrayToObject(body)
        this.setState({
          menu: bodyObject
        })
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
        Delivereat app
        {this.state.display === 'menu'
          ? <Menu addToOrder={this.addToOrder} menu={this.state.menu}/>
          : null
        }

        {this.state.display === 'order'
          ? <OrderReview menu={this.state.menu} order={this.state.order} amendQuantity={this.amendQuantity}/>
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
