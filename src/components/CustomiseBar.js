import React from 'react'

import ToppingItem from './ToppingItem.js'

import "../styles/CustomiseBar.scss"

class CustomiseBar extends React.Component{
  constructor(){
    super()

    this.handleAddCustomOrder = this.handleAddCustomOrder.bind(this)
  }

handleAddCustomOrder(){
  event.preventDefault()
  this.props.addToOrder(this.props.baseItem, this.props.viewing.toppings, 1)
}


  render(){
    return (
      <footer>
        <h4>Customise your burger</h4>
        {Object.values(this.props.toppings).map(item => {
          return <ToppingItem key={item.id} baseItem={this.props.baseItem} item={item} addTopping={this.props.addTopping} />
        })}
        <button onClick={this.handleAddCustomOrder}>Add to order</button>
      </footer>

    )

  }


}

export default CustomiseBar
