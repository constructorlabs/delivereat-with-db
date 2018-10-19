import React from 'react';
import '../styles/MenuItem.scss';

function MenuItem ( {item, getCurrency} ) {

    const img = `../static/images/${item.img}`
    return (
    <section key={item.id} className="menu__item">
        <ul>
            <li><img src={img}/></li>
            <li>{item.item}, &pound;{getCurrency(item.price)} - {item.course}</li>
        </ul>
    </section>)
}

export default MenuItem;