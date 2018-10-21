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
        <div>

          <div className="menu__category menu__popular">
            <h3 className="menu__category__header">Most Popular</h3>
            <div className="menu__items">
            {popular.map(item => {
              return <MenuItem key={item.id} menuItem={item} addToOrder={this.props.addToOrder} changeDisplay={this.props.changeDisplay}/>
            })}
          </div>
        </div>


          {Object.keys(catMenu).map(item => {
            return (<div className="menu__category" key={item}>
              <h3 className="menu__category__header">{item}</h3>
              <div className="menu__items">
              {Object.values(catMenu[item].map(item => {
                return <MenuItem key={item.id} menuItem={item} addToOrder={this.props.addToOrder} changeDisplay={this.props.changeDisplay}/>
              }))}
            </div>
            </div>)
          })}


        </div>






      </div>
    )
  }


}

export default Menu
