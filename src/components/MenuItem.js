import React from 'react';
import '../styles/MenuItem.scss';

function MenuItem ( {item, getCurrency} ) {

    const img = `../static/images/${item.img}`
    return (
    <section key={item.id} className="menu__item">
        <img src={img}/>
        <ul>
            <li>{item.item}</li>
            <li>{item.course}</li>
            <li>&pound;{getCurrency(item.price)}</li>
            <li><button>-</button> 0 <button>+</button></li>

        </ul>
    </section>)
}

export default MenuItem;