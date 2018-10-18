import React from 'react';
import Menu from './Menu.js'

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super()

    this.getMenu = this.getMenu.bind(this)

    this.state = {
      menu: {}
    }


}
  componentDidMount(){
  this.getMenu()
}


  arrayToObject(array){
    return array.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})
  }


  getMenu(){
    fetch('/api/menu/')
      .then(response => response.json())
      .then(body => {
        const bodyObject = this.arrayToObject(body)
        this.setState({
          menu: bodyObject
        })
      })
  }

  render(){
    return (
      <div>
        Delivereat app
        <Menu menu={this.state.menu}/>
      </div>
    )
  }
}

export default App;
