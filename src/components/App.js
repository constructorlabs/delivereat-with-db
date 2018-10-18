import React from 'react';
import MenuItems from './MenuItems';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
    this.getMenuArray = this.getMenuArray.bind(this);
    this.getMenuItembyId = this.getMenuItembyId.bind(this);
    this.state = { 
      menu: {}
    }
  }

  /* get menu data
  ///////////////////////////////////////////*/
 
  componentDidMount () {
    fetch("/api/menu")
    .then(response => response.json())
    .then(menu => {
      this.setState({ menu })
    })
  }

  getMenuArray () {
    return Object.values(this.state.menu);
  }

  getMenuItembyId (id) {
    return this.state.menu[id];
  }

  render(){
    const menuItems = this.state.menu && 
    <MenuItems 
      menuArray={this.getMenuArray()}
      getMenuItembyId={this.getMenuItembyId}
    />
    return (
      <React.Fragment>
        { menuItems }
      </React.Fragment>
    )
  }
}

export default App;