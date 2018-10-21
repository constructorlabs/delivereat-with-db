import React from 'react';
import '../styles/Header.scss';

function Header ( { currentPurchase, togglePurchaseBasket } ) {

    const basketCount = currentPurchase && (Object.values(currentPurchase.items).filter(item => typeof item === "object").length || null);
    return (
        <header className="header">
            <h1 className="header__title"><i className="fas fa-1x fa-utensils fas-padding-right"/>Lovely Grubbly</h1>
            <div className="header__items">
                <h1 className="header__items-count">{basketCount}</h1>
                <h1><a href="#" onClick={togglePurchaseBasket}>
                        <i className="fas fa-1x fa-shopping-basket header__items-toggle"></i>
                    </a>
                </h1>
            </div>
        </header>
    )
}

export default Header;