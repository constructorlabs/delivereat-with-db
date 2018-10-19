import React from 'react';
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
          this.props.removeItemOrder(this.props.menuitem.id);
          this.setState({
            added: !this.state.added
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

  // packaging a menuitem object
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
    
    let price = (Number(this.props.menuitem.price) * Number(this.state.quantity));
    const pricedisplay = this.props.menuitem.price;
   //console.log(this.props.menuitem.name, this.props.menuitem.price)
    // console.log(typeof pricedisplay)

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
                <span className="menuitem__price">&nbsp;&pound; {pricedisplay}</span>
                </label>
                <button type="submit" className={buttonclasses}></button>
                <span className={errorclasses}>Please select quantity</span>
              </div>  

            </div>


        </form>
      </li>
    )
  }
}

export default MenuItem;

