import React from 'react';

class MenuItem extends React.Component {
  constructor(){
    super();

    this.setState = {

    }


  }

handleClick(menuItem.id){
  this.props.receiveModal()
}

render(){
  return(
    <div onClick={() => this.handleClick(menuItem.id)}>
      <h2>{this.props.menuItem.name}</h2>
    </div>

  )
}

}

export default Menu;
