import React from 'react';
import '../styles/Header.scss';

function Header ( { currentPurchase, togglePurchaseBasket } ) {

    const basketCount = currentPurchase && (Object.values(currentPurchase.items).filter(item => typeof item === "object").length || null);
    return (
        <header className="header">
            <h1 className="header__title">Lovely Grubbly<i className="fas fa-1x fa-utensils"></i></h1>
            <div className="header__basket">
                <h1 className="header__basket__items">{basketCount}</h1>
                <h1><a href="#" onClick={togglePurchaseBasket}>
                        <i className="fas fa-1x fa-shopping-basket"></i>
                    </a>
                </h1>
            </div>
        </header>
    )
}

export default Header;