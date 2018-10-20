import React from "react"

import "../styles/Header.scss";

class Header extends React.Component{
  constructor(){
    super()


    this.handleDisplay = this.handleDisplay.bind(this)
  }

  handleDisplay(event){
    event.preventDefault()
    this.props.changeDisplay('menu')
  }

  render(){
    return (
      <header onClick={this.handleDisplay} className="header">
        <h1 className="header__logo">BURGER HOLE</h1>
        <div className="header__nav"><a className="header__navlink" href=""><h4>Menu</h4></a> <a className="header__navlink" href=""><h4>Info</h4></a></div>
      </header>
    )
  }


}

export default Header
