import React from 'react';
import MenuItem from './MenuItem'

function MenuItems ( {menuArray, getMenuItembyId} ) {

    return (
        ["starter", "main", "dessert"].map(course => {
            // <div><h1>{course}</h1>
            return (
                menuArray.filter(itemObject => itemObject.course === course)
                .map(itemObject => {
                return <MenuItem 
                            key={itemObject.id}
                            item={itemObject}
                        />
                })
            )
        })
    );
}

export default MenuItems;