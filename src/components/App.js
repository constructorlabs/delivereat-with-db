import React from 'react';
import MenuItems from './MenuItems';
import '../styles/App.scss';
import ViewPurchase from './ViewPurchase';

class App extends React.Component {
  constructor(){
    super();

    this.getCurrency = this.getCurrency.bind(this);
    this.getMenuArray = this.getMenuArray.bind(this);
    this.getMenuItembyId = this.getMenuItembyId.bind(this);

    this.handlePurchaseId = this.handlePurchaseId.bind(this);
    this.getPurchaseById = this.getPurchaseById.bind(this);

    this.state = { 
      menu: {},
      getPurchaseId: null,
      displayPurchaseById: null
    }
  }

  /* utilities
  ///////////////////////////////////////////*/
 
  getCurrency (string) {
    return string.toLocaleString("en-GB", {
      style: "currency", 
      currency: "GBP"
    });
  }

  /* get menu data
  ///////////////////////////////////////////*/
 
  componentDidMount () {
    fetch("/api/menu")
    .then(response => response.json())
    .then(menu => {
      this.setState({ menu })
    })
    .catch(error => res.json({ error: error.message }));
  }

  getMenuArray () {
    return Object.values(this.state.menu);
  }

  getMenuItembyId (id) {
    return this.state.menu[id];
  }

  /* get purchase by id
  ///////////////////////////////////////////*/
 
  handlePurchaseId (event) {
    this.setState({ getPurchaseId: event.target.value  })
  }

  getPurchaseById (event) {
    event.preventDefault();
    const id = this.state.getPurchaseId;
    fetch(`/api/purchase/${id}`)
    .then(response => response.json())
    .then(purchase => {
      this.setState({ displayPurchaseById: purchase })
    })
    .catch(error => res.json({ error: error.message }));
  }

  render() {

    const viewPurchase = 
    <ViewPurchase 
      getPurchaseById={this.getPurchaseById}
      handlePurchaseId={this.handlePurchaseId}
      displayPurchaseById={this.state.displayPurchaseById}
    />

    const menuItems = this.state.menu && 
    <MenuItems 
      menuArray={this.getMenuArray()}
      getMenuItembyId={this.getMenuItembyId}
      getCurrency={this.getCurrency}
    />

    return (
      <React.Fragment>
        { viewPurchase }
        { menuItems }
      </React.Fragment>
    )
  }
}

export default App;