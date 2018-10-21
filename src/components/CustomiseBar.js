import React from 'react'

import ToppingItem from './ToppingItem.js'

import "../styles/CustomiseBar.scss"

class CustomiseBar extends React.Component{
  constructor(){
    super()
  }




  render(){
    return (
      <footer>
        <h4>Customise your burger</h4>
        {Object.values(this.props.toppings).map(item => {
          return <ToppingItem item={item}/>
        })}
        <button>Add to order</button>
      </footer>

    )

  }


}

export default CustomiseBar
