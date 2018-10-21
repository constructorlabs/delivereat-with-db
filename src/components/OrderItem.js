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
    this.props.removeFromOrder(this.props.item)

  }

  handleChange(event){
    event.preventDefault()
    console.log("change")
    this.props.amendQuantity(this.props.item, event.target.value)

  }

  calculatePrice(){
     const basePrice = Number(this.props.menuItem.price * this.props.item.quantity)
     const toppingsPrice = this.props.item.toppings.reduce((acc, item) => {
       return acc + item.quantity * this.props.toppings[item.toppingId].price
     }, 0)
     return basePrice + toppingsPrice
  }



  render(){
    return (
      <div>
        <span>{this.props.menuItem.name}</span>

        <div className="order-item__ingredients">With: {this.props.item.toppings.map(item => {
          return <span className="order-item__ingredients-indi" key={item.toppingId}>{this.props.toppings[item.toppingId].name}</span>
        })}</div>

        <input onChange={this.handleChange} type="number" name="quantity" placeholder={this.props.quantity} min="1" max="5" />
        <span>£{this.calculatePrice().toFixed(2)}</span>
        <button onClick={this.handleRemove}>Remove</button>
      </div>

    )
  }
}

export default OrderItem
