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

    render () {

        const toggleButton = 
        <button onClick={this.toggleView}>View your order</button>

        const inputPurchaseId = this.state.toggleState &&
        <form onSubmit={this.props.getPurchaseById}>
            <ul className="purchase__id">
                <li><h2>View your order</h2></li>
                <li>Enter your order ID</li>
                <li><input onChange={this.props.handlePurchaseId} type="text" defaultValue={this.props.viewPurchaseId || ''} name="purchaseId" /></li>
                <li><button type="submit">SHOW ORDER DETAILS</button></li>
            </ul>
        </form>

        const displayPurchaseId = this.props.displayPurchaseById &&
        Object.values(this.props.displayPurchaseById).map(item => {
            const menuItem = this.props.menu[item.menu_id];
            const purchaseID = `purchaseId-${item.id}`;
            const total = this.props.getCurrency(menuItem.price * item.quantity);
            const price = this.props.getCurrency(menuItem.price);
            return ( item.id ? 
                <ul key={purchaseID}>
                    <li>{item.quantity} x {menuItem.item} @ {price} = {total}<i className="fas fa-1x fa-image fa-icon-style"></i></li>
                    <li><img src={`../static/images/${menuItem.img}`} /></li>
                </ul> : item
            )
        });

        

        return (
            <div className="purchase fadein">
                {/* {toggleButton} */}
                {inputPurchaseId}
                {displayPurchaseId}
            </div>
        )
    }
}

export default ViewPurchaseById;