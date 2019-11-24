import React from 'react';
import '../styles/ViewPurchase.scss';

class ViewPurchaseById extends React.Component {
    constructor(){
        super();
        this.toggleView = this.toggleView.bind(this)
        this.state = { 
            toggleState: true
        }
    }

    componentDidMount () {
        if (this.props.viewPurchaseId) {
            this.props.handlePurchaseId(this.props.viewPurchaseId);
        }
    }

    toggleView () {
        this.setState({ toggleState: !this.state.toggleState })
    }

    getPurchaseId () {
        return this.props.viewPurchaseId && (this.props.viewPurchaseId !== "0") ? this.props.viewPurchaseId : "";
    }

    render () {      

        const inputPurchaseId = 
        <form onSubmit={this.props.getPurchaseById}>
            <ul className="purchase__id">
                <li><h2>View your order</h2></li>
                <li>Enter your order ID</li>
                <li><input onChange={this.props.handlePurchaseId} type="text" defaultValue={this.getPurchaseId()} name="purchaseId" /></li>
                <li><button className="cancel" onClick={this.toggleView}>CANCEL</button><button className="details" type="submit">ORDER DETAILS</button></li>
            </ul>
        </form>

        let total = 0;
        let nameObj = false
        const displayPurchaseId = this.props.displayPurchaseById && 
        Object.values(this.props.displayPurchaseById).map(item => {
            const menuItem = this.props.menu[item.menu_id];
            const purchaseID = `purchaseId-${item.menu_id}`;
            const subTotal = (Number(menuItem.price) * Number(item.quantity));
            total = total + subTotal;
            nameObj = nameObj === false ? <li><strong>Name: {this.props.purchases[item.purchase_id].name}</strong></li> : null;
            return ( item.id ? 
                <ul key={purchaseID}>
                    {nameObj}
                    <li>{item.quantity} x {menuItem.item} @ {this.props.getCurrency(menuItem.price)} = {this.props.getCurrency(subTotal)}
                        <div className="tooltip">
                            <i className="fas fa-1x fa-image fa-icon-style"></i>
                            <div className="tooltip-content">
                                <img src={`../static/images/${menuItem.img}`} />
                            </div>
                        </div>
                    </li>
                </ul> : item
            )
        });

        const delivery = 3;
        const summary = this.props.displayPurchaseById && 
        <ul>
            <li><hr className="hr-black" /></li>
            <li>Subtotal: {this.props.getCurrency(total)}</li>
            <li>Delivery: {this.props.getCurrency(delivery)}</li>
            <li><strong>Total: {this.props.getCurrency(total + delivery)}</strong></li>
        </ul>

        return (
            this.state.toggleState && <div className="purchase fadein">
                {inputPurchaseId}
                {displayPurchaseId}
                {summary}
            </div>
        )
    }
}

export default ViewPurchaseById;