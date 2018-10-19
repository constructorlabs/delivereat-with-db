import React from 'react';
import Menu from './Menu.js'

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super()

    this.getMenu = this.getMenu.bind(this)
    this.addToOrder = this.addToOrder.bind(this)


    this.state = {
      menu: {},
      order: {}
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
      this.amendQuantity(menuItem, quantity)
    }
  }

  amendQuantity(menuItem, quantity){
    const order = this.state.order
    order[menuItem.id].quantity += quantity
    this.setState({
      order
    })


  }

  render(){
    return (
      <div>
        Delivereat app
        <Menu addToOrder={this.addToOrder} menu={this.state.menu}/>
      </div>
    )
  }
}

export default App;
