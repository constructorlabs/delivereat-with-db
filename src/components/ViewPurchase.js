import React from 'react';

class ViewPurchase extends React.Component {
    constructor(){
        super();
        this.toggleView = this.toggleView.bind(this)
        this.state = { 
            toggleState: false
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
            <h2>View your order:</h2>
            ID: <input onChange={this.props.handlePurchaseId} type="text" name="purchaseId" />
            <button type="submit">Show purchase</button>
        </form>

        const displayPurchaseId = this.props.displayPurchaseById &&
        Object.values(this.props.displayPurchaseById).map(item => {
            const purchaseID = `purchaseId-${item.id}`;
            return ( item.id ? 
            <ul key={purchaseID}>
                <li>purchase_id: {item.purchase_id}</li>
                <li>menu_id: {item.menu_id}</li>
                <li>quantity: {item.quantity}</li>
                <li>menu_purchase_id: {item.id}</li>
            </ul> : item
            )
        });

        return (
            <section>
                {toggleButton}
                {inputPurchaseId}
                {displayPurchaseId}
            </section>
        )
    }
}

export default ViewPurchase;