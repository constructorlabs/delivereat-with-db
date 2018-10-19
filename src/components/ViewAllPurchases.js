import React from 'react';

function ViewAllPurchases ({ currentPurchase, menu }) {

    const purchaseItems = Object.values(currentPurchase.items);

    return (
    <section>
        {purchaseItems.map(obj => {
            return (
                <div key={obj.id}>
                    {obj.quantity} x {menu[obj.id].item} @ {menu[obj.id].price} = 
                    &nbsp;{obj.quantity * menu[obj.id].price}
                </div>
                );
        })}
    </section>)
}

export default ViewAllPurchases;