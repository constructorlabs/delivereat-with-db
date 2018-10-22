import React from 'react'

import OrderItem from "./OrderItem.js"

class OrderReview extends React.Component{
  constructor(){
    super()

    this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
  }

  handlePlaceOrder(event){
    event.preventDefault()
    this.props.placeOrder()
  }


  render(){
    const order = this.props.order
    const menu = this.props.menu

    return(
      <div>
        <ul>
          {Object.values(order).map(item => {
            return <OrderItem key={menu[item.id].id}
                              item={item}
                              menuItem={menu[item.id]}
                              toppings={this.props.toppings}
                              quantity={item.quantity}
                              amendQuantity={this.props.amendQuantity}
                              addToOrder={this.props.addToOrder}
                              removeFromOrder={this.props.removeFromOrder}/>
          })}
        </ul>
        <div className="order-confirmation__total">
          <span>Delivery: FREE! </span>
          <span>Total to pay: £{this.props.calculateTotal()}</span>
          <button onClick={this.handlePlaceOrder}>Place Order</button>
        </div>

      </div>

    )
  }
}

export default OrderReview
