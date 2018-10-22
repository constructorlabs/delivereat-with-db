import React from 'react'
import CustomiseBar from './CustomiseBar.js'

import '../styles/MaximisedMenuItem.scss'

class MaximisedMenuItem extends React.Component{
  constructor(){
    super()

    this.handleAdd = this.handleAdd.bind(this)
    this.calculatePriceWithToppings = this.calculatePriceWithToppings.bind(this)
  }

handleAdd(event){
  event.preventDefault()
  this.props.addToOrder(this.props.viewing, 1)
}

calculatePriceWithToppings(){
  const basePrice = Number(this.props.viewing.baseItem.price)
  const toppingsPrice = this.props.viewing.toppings.reduce((acc, item) => {
    return acc + (this.props.toppings[item.toppingId].price * item.quantity)
  }, 0)
  return basePrice + toppingsPrice
}


  render(){
    const backgroundStyle = {
      backgroundImage: `url(${this.props.viewing.baseItem.photo_url})`

    }

    return(
    <div className="customisation-screen">
      <div className="max-menu-item">
      <div onClick={this.maximiseItem} className="transparent-gradient">
      <li style={backgroundStyle} className="max-menu-item"><h3 className="max-menu-item__name">{this.props.viewing.baseItem.name}</h3>
         <span className="max-menu-item__price-add"> <span className="max-menu-item__price">£{(this.calculatePriceWithToppings()).toFixed(2)}</span>
        </span>
      </li>
    </div>
  </div>
  <CustomiseBar viewing={this.props.viewing} baseItem={this.props.viewing.baseItem} toppings={this.props.toppings} addTopping={this.props.addTopping} addToOrder={this.props.addToOrder}/>
</div>
    )
  }


}

export default MaximisedMenuItem
