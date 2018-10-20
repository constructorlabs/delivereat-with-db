import React from 'react';
import MenuItem from './MenuItem';

function MenuItems ({  menuArray, getCurrency, currentPurchase, receiveCurrentPurchase }) {

    // function handleClick(course, event) {
    //     console.log(course, event.target.checked);
    // }

    const courses = ["starter", "main", "dessert"];
    const menuDisplay = courses.map(course => {
        const menuSection = menuArray.filter(itemObject => {
            return itemObject.course === course;
        })
        .map(itemObj => {
            return <MenuItem
                    key={itemObj.id}
                    item={itemObj}
                    getCurrency={getCurrency}
                    currentPurchase={currentPurchase}
                    receiveCurrentPurchase={receiveCurrentPurchase}
                />
        })
        return (
            <React.Fragment key={course}>
                {<h1>{course}</h1>}
                {menuSection}
            </React.Fragment>
        )}
    )
    return (
        <React.Fragment>
            {menuDisplay}
        </React.Fragment>
    )
}

export default MenuItems;