import React from 'react';

function MenuItem ( {item} ) {
    const img = `../static/images/${item.img}`
    return (<section key={item.id}>
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