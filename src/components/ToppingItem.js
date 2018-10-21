import React from 'react'

class ToppingItem extends React.Component{
  constructor(){
    super()

    this.handleAddTopping = this.handleAddTopping.bind(this)
  }

  handleAddTopping(event){
    event.preventDefault()
    this.props.addTopping(this.props.baseItem, this.props.item)
  }

  render(){
    return(
      <li>{this.props.item.name} {this.props.item.price} <a href="" onClick={this.handleAddTopping}><i className="fas fa-plus"></i></a></li>
    )
  }
}

export default ToppingItem
