import React from 'react'

class OrderItem extends React.Component{
  constructor(){
    super()

    this.handleRemove = this.handleRemove.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.calculatePrice = this.calculatePrice.bind(this)
  }

  handleRemove(event){
    event.preventDefault()
    // this.props.removeFromOrder(this.props.item.menuItem)

  }

  handleChange(event){
    event.preventDefault()
    console.log("change")
    this.props.amendQuantity(this.props.item, event.target.value)

  }

  calculatePrice(){
     return (this.props.item.price * this.props.quantity).toFixed(2)
  }



  render(){
    return (
      <div>
        <span>{this.props.item.name}</span>
        <input onChange={this.handleChange} type="number" name="quantity" placeholder={this.props.quantity} min="1" max="5" />
        <span>£{this.calculatePrice()}</span>
        <button onClick={this.handleRemove}>Remove</button>
      </div>

    )
  }
}

export default OrderItem
