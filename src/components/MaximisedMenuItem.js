import React from 'react'
import CustomiseBar from './CustomiseBar.js'

import '../styles/MaximisedMenuItem.scss'

class MaximisedMenuItem extends React.Component{
  constructor(){
    super()

    this.handleAdd = this.handleAdd.bind(this)
  }

handleAdd(event){
  event.preventDefault()
  this.props.addToOrder(this.props.menuItem, 1)
}




  render(){
    const backgroundStyle = {
      backgroundImage: `url(${this.props.menuItem.baseItem.photo_url})`

    }

    return(
    <div className="customisation-screen">
      <div className="max-menu-item">
      <div onClick={this.maximiseItem} className="transparent-gradient">
      <li style={backgroundStyle} className="max-menu-item"><h5 className="max-menu-item__name">{this.props.menuItem.baseItem.name}</h5>
         <span className="max-menu-item__price-add"> <span className="max-menu-item__price">£{this.props.menuItem.baseItem.price}    </span>
        </span>
      </li>
    </div>
  </div>
  <CustomiseBar viewing={this.props.menuItem} baseItem={this.props.menuItem.baseItem} toppings={this.props.toppings} addTopping={this.props.addTopping} addToOrder={this.props.addToOrder}/>
</div>
    )
  }


}

export default MaximisedMenuItem
