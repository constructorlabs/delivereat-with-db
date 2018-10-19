import React from 'react';
import '../styles/MenuItem.scss';

class MenuItem extends React.Component {
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.incQuantity = this.incQuantity.bind(this);
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
        this.props.addToCurrentPurchase(this.state.quantity, this.props.item.id);
    }

    render () {

        const img = `../static/images/${this.props.item.img}`;

        return (
        <section key={this.props.item.id} className="menu__item">
            <img src={img}/>
            <ul>
                <li>{this.props.item.item} &pound;{this.props.getCurrency(this.props.item.price)}</li>
                <li><button onClick={(event) => this.incQuantity(-1, event)}> - </button> 
                     &nbsp;{this.state.quantity}&nbsp;
                    <button onClick={(event) => this.incQuantity(1, event)}> + </button> 
                </li>
                <li><button onClick={this.handleSubmit} type="submit">Add to order</button></li>
            </ul>
        </section>)
    }
}

export default MenuItem;