import React from 'react';
import { log } from 'util';

class SingleProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            quantity: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputHandle = this.inputHandle.bind(this);
        this.subtractingQuantity = this.subtractingQuantity.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.basketItem(this.props.singleItem, this.state.quantity);
    }

    inputHandle(event) {
        if (Number(event.target.value) >= 0) {
            this.setState({ quantity: Number(event.target.value) },
                () => { this.props.basketItem(this.props.singleItem, this.state.quantity) });
        }
    }

    subtractingQuantity() {
        if (this.state.quantity > 0) {
            this.setState({ quantity: Number(this.state.quantity) - 1 })
        }
    }

    addQuantity() {
        this.setState({ quantity: Number(this.state.quantity) + 1 })
    }

    render() {
        // console.log(this.props.singleItem);

        return (
            <div className={'singleProduct'}>
                <form onSubmit={this.handleSubmit} className='singleProduct__form'>
                    <img className='singleProduct__image' src={this.props.singleItem.url} alt="" />
                    <p className='singleProduct__name'>{this.props.singleItem.name}</p>
                    <p className='singleProduct__price'>£{this.props.singleItem.price}</p>
                    <button className='singleProduct__buttonSubtractingQuantity' onClick={this.subtractingQuantity}>&#8211;</button>
                    <input className='singleProduct__quantityInput' onChange={this.inputHandle} type="number" value={this.state.quantity} />
                    <button className='singleProduct__buttonAddQuantity' onClick={this.addQuantity}>&#43;</button>
                    <p className='singleProduct__description'>
                        <p>Description:</p>
                        <p>{this.props.singleItem.description}</p>
                    </p>
                </form>
            </div>
        )
    }
}

export default SingleProduct;