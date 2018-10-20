import React from "react"

import MenuItem from "./MenuItem.js"

import "../styles/Menu.scss"

class Menu extends React.Component{
  constructor(){
    super()
  }


  categoriseMenu(menu){
    const newObj = Object.values(menu).reduce((acc, item) => {
        acc[item.type] = acc[item.type] || [];
        acc[item.type].push(item);
        return acc
    }, {})
    return newObj
  }


  render(){
    const catMenu = this.categoriseMenu(this.props.menu)
    const popular = Object.values(this.props.mostPopular)
    let currentCategory = ""


    return(
      <div className="menu">
        <div className="menu__restaurant">
          <h2>Burger Bar</h2>
        </div>
        <div className="menu__items">

          <div className="menu__category menu__popular">
            <h3>Most Popular</h3>
            {popular.map(item => {
              return <MenuItem key={item.id} menuItem={item} addToOrder={this.props.addToOrder}/>
            })}
        </div>


          {Object.keys(catMenu).map(item => {
            return (<div className="menu__category" key={item}>
              <h3>{item}</h3>
              {Object.values(catMenu[item].map(item => {
                return <MenuItem key={item.id} menuItem={item} addToOrder={this.props.addToOrder} />
              }))}
            </div>)
          })}


        </div>






      </div>
    )
  }


}

export default Menu
