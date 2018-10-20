import React from 'react';
import '../styles/MenuItem.scss';

class MenuItem extends React.Component {
    constructor () {
        super();
        this.incQuantity = this.incQuantity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            quantity: 0
        }
    }

    incQuantity (amount, event) {
        event.preventDefault();
        const keepPositive = n => (n < 0 ? 0 : n);
        this.setState({
            quantity: keepPositive(this.state.quantity + amount)
        })
    }

    handleSubmit (event) {
        event.preventDefault();
        const id = this.props.item.id;
        let currentPurchase;
        const initialCurrentPurchase = { [id]: {id: id, quantity: this.state.quantity} }
        if (!this.props.currentPurchase) {
            currentPurchase = { items: initialCurrentPurchase }
          } else {
          if (this.state.quantity > 0) {
            currentPurchase = Object.assign({}, this.props.currentPurchase, {
              items: Object.assign({}, this.props.currentPurchase.items, initialCurrentPurchase )
            });
          } else {
            currentPurchase = this.props.currentPurchase;
            delete currentPurchase.items[id];
          }
        }
        this.props.receiveCurrentPurchase(currentPurchase);
        // name: "Dave",
        // tel: "07901 972 811"
      }

    render () {
        const imagePath = `../static/images/${this.props.item.img}`;
        return (
        <section key={this.props.item.id} className="menu__item">
            <img src={imagePath}/>
            <ul>
                <li>{this.props.item.item} &pound;{this.props.getCurrency(this.props.item.price)}</li>
                <li>
                    <button onClick={(event) => this.incQuantity(-1, event)}> - </button> 
                        &nbsp;{this.state.quantity}&nbsp;
                    <button onClick={(event) => this.incQuantity(1, event)}> + </button> 
                </li>
                <li>
                    <button onClick={this.handleSubmit} type="submit">
                        Add to order
                    </button>
                </li>
            </ul>
        </section>)
    }
}

export default MenuItem;