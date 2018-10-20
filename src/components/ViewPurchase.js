import React from 'react';
import '../styles/ViewPurchase.scss';

function ViewPurchase ({ currentPurchase, getCurrency, menu }) {
    const purchaseItems = Object.values(currentPurchase.items) || null;
    let total = 0;
    const deliveryCharge = 3;
    const displayPurchaseItems = purchaseItems.length ? (<div>
        <section className="purchase__items">
            <ul>
            { purchaseItems.map(obj => {
                const price = Number(menu[obj.id].price);
                total += obj.quantity * price;
                return (
                    <li key={obj.id}>
                        {obj.quantity} x {menu[obj.id].item} @ &nbsp;{getCurrency(price)} = &nbsp;{getCurrency(Number(obj.quantity * price))}
                    </li>
                );
            })}
            <li>Subtotal: {getCurrency(total)}</li>
            <li><strong>Delivery: {getCurrency(deliveryCharge)}</strong></li>
            <li><strong>Total: {getCurrency(total + deliveryCharge)}</strong></li>
            </ul>
        </section>
        <section className="purchase__checkout">
            <ul>
                <li><input type="text" placeholder="Name" /></li>
                <li><input type="text" placeholder="Telephone" /></li>
                <li><button>Place your order</button></li>
            </ul>
        </section>
    </div>) : 'Your basket is empty';

    return (
        <div className="purchase">
            <header className="purchase__header">
                <h2>Your Basket</h2>
            </header>
            {displayPurchaseItems}
        </div>
    )
}

export default ViewPurchase;