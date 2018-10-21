import React from 'react';
import '../styles/ViewPurchase.scss';

// const sendSMS = (customerId, content) => {
//     const accountSid = process.env.twilio_accountSid;
//     const authToken = process.env.twilio_authToken;
//     const client = require('twilio')(accountSid, authToken);
//     console.log('sendSMS')
//       db.one('SELECT * FROM customer WHERE id = $1', [customerId])
//         .then(function(data){
//           client.messages
//           .create({
//             body: content,
//             from: process.env.twilio_number,
//             to: data.telephone
//           })
//           .then(message => console.log(message.sid))
//           .done();
//         })
//     }

function ViewPurchase ({ resetPurchaseId, purchaseIdFromSuccess, receiveFormInput, addSinglePurchase, currentPurchase, getCurrency, menu }) {
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
                        <i className="fas fa-1x fa-image fa-icon-style"></i>
                    </li>
                );
            })}
                <li><hr className="hr-black" /></li>
                <li>Subtotal: {getCurrency(total)}</li>
                <li>Delivery: {getCurrency(deliveryCharge)}</li>
                <li><strong>Total: {getCurrency(total + deliveryCharge)}</strong></li>
                <li><hr className="hr-white"/></li>
            </ul>
        </section>
        <section className="purchase__checkout">
            <ul>
                <li><input type="text" name="name" onChange={receiveFormInput} placeholder="Name" /></li>
                <li><input type="text" name="telephone" onChange={receiveFormInput} placeholder="Telephone" /></li>
                <li><button onClick={addSinglePurchase}>PLACE YOUR ORDER</button></li>
            </ul>
        </section>
    </div>) : 'Your basket is empty';

    const state = purchaseIdFromSuccess === null ? (
        <React.Fragment>
            <header className="purchase__header">
                    <h2>Your Basket<i className="fas fa-1x fa-shopping-basket" /></h2>
                </header>
            {displayPurchaseItems}
        </React.Fragment>) : 
        (<React.Fragment>
            <header className="purchase__header">
                <h2>Your order</h2>
            </header>
            <section className="purchase__checkout">
            <ul>
                <li>Success! your order ID is {purchaseIdFromSuccess.orderId}. 
                Please keep a record of it.</li>
                <li><a href={`/?viewPurchaseId=${purchaseIdFromSuccess.orderId}`}>See a summary of your order</a></li>
                <li>&nbsp;</li>
                <li><button onClick={resetPurchaseId}>OK</button></li>
            </ul>
        </section>
        </React.Fragment>)

    return (
        <div className="purchase fadein">
            {/* <header className="purchase__header">
                <h2>Your Basket<i className="fas fa-1x fa-shopping-basket"></i></h2>
            </header>
            {displayPurchaseItems} */}
            {state}
        </div>
    )
}

export default ViewPurchase;