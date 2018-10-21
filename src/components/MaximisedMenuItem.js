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
      backgroundImage: `url(${this.props.menuItem.photo_url})`

    }

    return(
    <div className="customisation-screen">
      <div className="max-menu-item">
      <div onClick={this.maximiseItem} className="transparent-gradient">
      <li style={backgroundStyle} className="max-menu-item"><h5 className="max-menu-item__name">{this.props.menuItem.name}</h5>
         <span className="max-menu-item__price-add"> <span className="max-menu-item__price">£{this.props.menuItem.price}    </span>
          <a href="" onClick={this.handleAdd}><i className="fas fa-plus-circle"></i></a>
        </span>
      </li>
    </div>
  </div>
  <CustomiseBar toppings={this.props.toppings}/>
</div>
    )
  }


}

export default MaximisedMenuItem
