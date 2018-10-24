import React from 'react';
import MenuItem from './MenuItem';

function Menu({menu, receiveItemOrder, removeItemFromOrder}) {

  function getMenuItem() {
    const menuArr = Object.values(menu)
    return menuArr.map(menuitem => {
     return <MenuItem 
      menuitem={menuitem} 
      key={menuitem.id} 
      menu={menu} 
      receiveItemOrder={receiveItemOrder}
      removeItemFromOrder={removeItemFromOrder} />
    })
   };

    return (
      <ul className="menu menu--settings">
          <h2>Menu</h2>
          {getMenuItem()}
      </ul>
    )
}

export default Menu;
