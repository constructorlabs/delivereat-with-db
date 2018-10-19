import React from 'react';
import MenuItem from './MenuItem'

function MenuItems ( {menuArray, getCurrency} ) {
    const courses = ["starter", "main", "dessert"];
    const menuDisplay = courses.map(course => {
        return ( 
            // const header = <h1>{course}</h1>
            menuArray.filter(itemObject => {
                return itemObject.course === course;
            })
            .map(itemObject => {
                // const header = <h1>{course}</h1>
                return <MenuItem
                        key={itemObject.id}
                        item={itemObject}
                        getCurrency={getCurrency}
                    />
            })
        )}
    )
    return (
        <div>
            {menuDisplay}
        </div>
    )
}

export default MenuItems;