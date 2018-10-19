import React from 'react';
import '../styles/MenuItem.scss';

function MenuItem ( {item} ) {
    const img = `../static/images/${item.img}`
    return (
    <section key={item.id} className="menu__item">
        <ul>
            <li>{item.id}</li>
            <li>{item.item}</li>
            <li>{item.price}</li>
            <li><img src={img}/></li>
            <li>{item.course}</li>
        </ul>
    </section>)
}

export default MenuItem;