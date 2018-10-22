import React from 'react'

import '../styles/SeeOrder.scss';

class SeeOrder extends React.Component{
  constructor(){
    super()

    this.handleSeeOrder = this.handleSeeOrder.bind(this)
  }

  handleSeeOrder(){
    event.preventDefault()
    this.props.changeDisplay('order')
  }


  render(){
    return(
      <header className="footer">
        <span>Current Total: £{this.props.calculateTotal()}</span>
        <button onClick={this.handleSeeOrder} className="footer__see-order-btn">See Order</button>
      </header>
    )
  }
}
 export default SeeOrder
