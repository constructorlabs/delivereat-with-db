import React from 'react'

class ToppingItem extends React.Component{
  constructor(){
    super()
  }

  handleAddTopping(event){
    event.preventDefault()
  }

  render(){
    return(
      <li>{this.props.item.name}  <a href="" onClick={this.handleAddTopping}><i class="fas fa-plus"></i></a></li>
    )
  }
}

export default ToppingItem
