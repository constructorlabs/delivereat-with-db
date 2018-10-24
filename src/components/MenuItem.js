import React from 'react';
import '../styles/components/menuitem.scss';
import cx from 'classnames';

class MenuItem extends React.Component {
  constructor(){
    super();

    this.state = {
      quantity: 0,
      added: false, 
      error: false
    };

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.itemOrder = this.itemOrder.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.quantity <= 0) {
      this.setState({
        error: !this.state.error
      });
    } else {
      if (this.state.added === false) {
        this.itemOrder();
        this.setState({
          added: !this.state.added
        });
      } else {
          this.props.removeItemFromOrder(this.props.menuitem.id);
          this.setState({
            added: !this.state.added,
            quantity: 0
          });
      }
    }
  }

  handleClick(event) {
   if (event.target.value === "-" && this.state.quantity > 0) {
      this.setState({
        quantity: this.state.quantity - 1
      });
    } else if (event.target.value === "+") {
      this.setState({
        quantity: this.state.quantity + 1
      });
      if (this.state.error === true) {
        this.setState({
          error: false
        });
      }
    }
  }

  /* -- package menuitem object --*/
  itemOrder() {
      const menuitem = {
      id: this.props.menuitem.id,
      quantity: this.state.quantity
    };
    this.props.receiveItemOrder(menuitem);
  }

  render(){

    const buttonclasses = cx('menuitem__submit', {
      'added': this.state.added
    });
    const errorclasses = cx('menuitem__error', {
      'show--error': this.state.error
    });    
    const priceDisplay = this.props.menuitem.price;
    
    return (
      <li className="menuitem">
          <form className="menuitem__form" onSubmit={this.handleSubmit}>

            <div className="quantity">
              <input className="quantity__change" onClick={this.handleClick} value="-" type="button"/>
              <input className="quantity__display" type="text" size='1' value={this.state.quantity} readOnly/>
              <input className="quantity__change" onClick={this.handleClick} value="+" type="button"/>
            </div>

            <div className="menuitem__details">
              <div className="menuitem__select">
                <label className="menuitem__item">{this.props.menuitem.name} 
                <span className="menuitem__price">&nbsp;&pound;{priceDisplay}</span>
                </label>
                <button type="submit" className={buttonclasses}></button>
                {/* <button onClick={()=>this.props.removeItemFromOrder(this.props.menuitem.id)}>Remove</button> */}
                <span className={errorclasses}>Please select quantity</span>
              </div>  

            </div>


        </form>
      </li>
    )
  }
}

export default MenuItem;

