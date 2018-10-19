import React from "react"

import MenuItem from "./MenuItem.js"

// import "../styles/Menu.scss"

class Menu extends React.Component{
  constructor(){
    super()
  }


  render(){
    const menu = Object.values(this.props.menu)
    let currentCategory = ""


    return(
      <div className="menu">
        <div className="menu__restaurant">
          <h2>Burger Bar</h2>
        </div>
        <div className="menu__items">
          {menu.map(item => {
            if (currentCategory !== item.type){
              currentCategory = item.type
              return (
                    <React.Fragment key={item.type} >
                      <h3>{item.type}</h3>
                      <MenuItem key={item.id} menuItem={item} addToOrder={this.props.addToOrder}/>
                    </React.Fragment>)
            }else{
              return <MenuItem key={item.id} menuItem={item} addToOrder={this.props.addToOrder} />
            }
          })}

        </div>






      </div>
    )
  }


}

export default Menu
