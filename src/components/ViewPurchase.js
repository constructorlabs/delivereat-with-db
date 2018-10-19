import React from 'react';

function ViewPurchase ({ currentPurchase, getCurrency, menu }) {
    const purchaseItems = Object.values(currentPurchase.items);
    return (
    <section>
        {purchaseItems.map(obj => {
            return (
                <div key={obj.id}>
                    {obj.quantity} x {menu[obj.id].item} @ &nbsp;{getCurrency(Number(menu[obj.id].price))} = &nbsp;{getCurrency(Number(obj.quantity * menu[obj.id].price))}
                </div>
            );
        })}
    </section>)
}

export default ViewPurchase;