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
                        {obj.quantity} x {menu[obj.id].item} @ {getCurrency(price)} = {getCurrency(Number(obj.quantity * price))}
                    </li>
                );
            })}
                <li><hr className="purchase__hr-black" /></li>
                <li>Subtotal: {getCurrency(total)}</li>
                <li>Delivery: {getCurrency(deliveryCharge)}</li>
                <li><strong>Total: {getCurrency(total + deliveryCharge)}</strong></li>
                <li><hr className="purchase__hr-white" /></li>
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
        <div className="purchase fadein">
            <header className="purchase__header">
                <h2>Your Basket<i className="fas fa-1x fa-shopping-basket"></i></h2>
            </header>
            {displayPurchaseItems}
        </div>
    )
}

export default ViewPurchase;