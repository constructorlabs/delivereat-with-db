import React from 'react';

class Order extends React.Component {
  constructor(){
    super();

    this.state = {
      name: "",
      address: "",
      telephone: "",

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeTelephone = this.handleChangeTelephone.bind(this);
    this.receiveRemoveItem = this.receiveRemoveItem.bind(this);
    this.handleClear = this.handleClear.bind(this);
    // this.updateQuantity = this.updateQuantity.bind(this);
  }

handleClear(event){
  event.preventDefault()
  this.props.clearOrder()
  this.setState({
    name: "",
    address: "",
    telephone: "",
  })
}

handleSubmit(event){
  event.preventDefault()
  this.props.submitOrder(this.state.name, this.state.address, this.state.telephone)
  this.setState({
    name: "",
    address: "",
    telephone: "",
  })
}

handleChangeName(event){
  this.setState({
    name: event.target.value
  })
}

handleChangeAddress(event){
  this.setState({
    address: event.target.value
  })
}

handleChangeTelephone(event){
  this.setState({
    telephone: event.target.value
  })
}

receiveRemoveItem(id){
  this.props.receiveRemoveItem(id)
}

// updateQuantity(id, event.target.value){
//   this.props.updateQuantity(id, event.target.value)
// }

render(){
  const orderDetails = Object.entries(this.props.order)
  const total = orderDetails.reduce((acc, [id, quantity]) => {
    const {price} = this.props.menu.find(item => item.id.toString() === id) // price is destructing from the object for the property called price, declaring ocnst equal to price
    return acc +(quantity * price)
  }, 0)
  const deliveryCharge =  total > 20 ? "you've qualified for free delivery" : 3.95
  const totalIncDelivery = total > 20 ? total : total + 3.95
  return(
    <div className="modal-content">
      <h3 className="modal-header">Your Order Basket</h3>
      <div className="modal-body">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
        </table>
        {orderDetails.map (([id, quantity]) => {
          const menuItem = this.props.menu.find(item => item.id.toString() === id)
          return(
            <tr>
              <td>{menuItem.name}</td>
              <td>X{quantity}</td>
              {/* <td><input onChange={event => this.updateQuantity(id, event)} /></td> */}
              <td>£{quantity * menuItem.price}</td>
              <td><button onClick={event => this.receiveRemoveItem(id)}>Remove Item</button></td>
            </tr>
          )
        })}
      </div>
      <tr>
        <td>{total.toFixed(2)}xxxx</td>
        <td>{deliveryCharge}xxxx</td>
        <td>{totalIncDelivery.toFixed(2)}</td>
        <button onClick={this.handleClear} name="clear">Clear Basket</button>
      </tr>
      <div>
        <form onSubmit={this.handleSubmit} className="orderForm" >
          <input onChange={this.handleChangeName}  type="text" placeholder="Name"/>
          <input onChange={this.handleChangeAddress} type="text" placeholder="Address"/>
          <input onChange={this.handleChangeTelephone} type="number" placeholder="Telephone"/>
          <button name="submit">Submit My Order</button>
        </form>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  )
}

}

export default Order
