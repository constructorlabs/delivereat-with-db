import React from 'react'


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
    return(
      <li className="menu-item">{this.props.menuItem.name}
         <span className="menu-item__price-add"> <span className="menu-item__price">£{this.props.menuItem.price}    </span>
          <a href="" onClick={this.handleAdd}><i className="fas fa-plus-circle"></i></a>
        </span>
      </li>
    )
  }


}

export default MenuItem
