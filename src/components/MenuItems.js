import React from 'react';
import MenuItem from './MenuItem'

function createKey (string, number) {
    const key = `${string}-${number}`;
    console.log(key);
    return key;
}

function MenuItems ( {menuArray, getCurrency} ) {
    const courses = ["starter", "main", "dessert"];
    let counter = "";
    const menuDisplay = courses.map(course => {
        const header = <h1>{course}</h1>;
        const menuSection = menuArray.filter(itemObject => {
            return itemObject.course === course;
        })
        .map(itemObj => {
            counter = itemObj.id;
            // console.log(JSON.stringify(itemObj))
            return <MenuItem
                    key={itemObj.id}
                    item={itemObj}
                    getCurrency={getCurrency}
                />
        })
        return (
            <div key={ createKey (course, counter)}>
                {header}
                {menuSection}
            </div>
        )}
    )
    return (
        <React.Fragment>
            {menuDisplay}
        </React.Fragment>
    )
}

export default MenuItems;