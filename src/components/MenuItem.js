import React from 'react';

class MenuItem extends React.Component {
  constructor(){
    super();

    this.setState = {

    }

    this.handleClick = this.handleClick.bind(this);

  }

handleClick(){
  this.props.receiveModal(this.props.menuItem.id)
}

render(){
  return(
    <div className="menuItem" onClick={this.handleClick}>
      <h2>{this.props.menuItem.name}</h2><img src={"/static/"+this.props.menuItem.photourl} />
    </div>

  )
}

}

export default MenuItem;
