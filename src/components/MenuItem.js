import React from 'react';
import '../styles/MenuItem.scss';
import '../styles/Checkbox.scss';

class MenuItem extends React.Component {
    constructor () {
        super();
        this.incQuantity = this.incQuantity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateQuantity = this.validateQuantity.bind(this);
        
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
        if (this.state.quantity > 0) {        
            if (this.props.currentPurchase) {
                currentPurchase = Object.assign({}, this.props.currentPurchase, { items: Object.assign({}, this.props.currentPurchase.items, initialCurrentPurchase )});
            } else {
                currentPurchase = Object.assign({}, this.props.currentPurchase, { items: Object.assign({}, initialCurrentPurchase )});
            }
        } else {
            if (this.props.currentPurchase) {
                currentPurchase = this.props.currentPurchase;
                delete currentPurchase.items[id];
            } else {
                return;
            }
        }
        this.props.receiveCurrentPurchase(currentPurchase);
        }

        validateQuantity (n) {
            if (this.state.quantity > 0 && !this.props.currentPurchase) {
                this.setState({ quantity: 0 });
                return n;
            } else {
                return this.state.quantity;
            }
        }

        shouldComponentUpdate() {
            return true;
        }

    render () {
        const imagePath = `../static/images/${this.props.item.img}`;
        return (
            <section key={this.props.item.id} className="menu__item">
                <img src={imagePath}/>
                <ul className="menu__item-details">
                    <li>{this.props.item.item}</li>
                    <li>Price: &pound;{this.props.getCurrency(this.props.item.price)}</li>
                    <li>
                        <ul className="menu__item-amount">
                            <li><button onClick={(event) => this.incQuantity(-1, event)}> - </button></li>
                            <li>{this.state.quantity}</li>
                            <li><button onClick={(event) => this.incQuantity(1, event)}> + </button></li>
                        </ul>
                    </li>
                    <li>
                        <button onClick={this.handleSubmit} type="submit">
                            ADD / UPDATE
                        </button>
                    </li>
                </ul>
            </section>
        )
    }
}

export default MenuItem;