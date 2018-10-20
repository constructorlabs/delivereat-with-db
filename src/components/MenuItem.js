import React from 'react'

import '../styles/MenuItem.scss'

class MenuItem extends React.Component{
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
      <div className="transparent-gradient">
      <li style={backgroundStyle} className="menu-item"><h5 className="menu-item__name">{this.props.menuItem.name}</h5>
         <span className="menu-item__price-add"> <span className="menu-item__price">£{this.props.menuItem.price}    </span>
          <a href="" onClick={this.handleAdd}><i className="fas fa-plus-circle"></i></a>
        </span>
      </li>
    </div>
    )
  }


}

export default MenuItem
