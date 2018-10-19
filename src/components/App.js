import React from 'react';
import MenuItems from './MenuItems';
import ViewPurchase from './ViewPurchase'; 
import ViewAllPurchases from './ViewAllPurchases';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.getCurrency = this.getCurrency.bind(this);
    this.getMenuArray = this.getMenuArray.bind(this);
    this.getMenuItembyId = this.getMenuItembyId.bind(this);
    this.addToCurrentPurchase = this.addToCurrentPurchase.bind(this);

    this.handlePurchaseId = this.handlePurchaseId.bind(this);
    this.getPurchaseById = this.getPurchaseById.bind(this);
    this.getAllPurchases = this.getAllPurchases.bind(this);
    this.addSinglePurchase = this.addSinglePurchase.bind(this);

    this.state = { 
      menu: {},
      purchases: {},
      purchaseIdForGet: null,
      purchaseIdFromSuccess: null,
      displayPurchaseById: null,
      currentPurchase: null
    }
  }

  /* initialise
  ///////////////////////////////////////////*/
 
  componentDidMount () {
    this.getAllMenuItems();
    this.getAllPurchases();
    // this.addSinglePurchase();
  }

  /* utilities
  ///////////////////////////////////////////*/
 
  getCurrency (string) {
    return string.toLocaleString("en-GB", {
      style: "currency", 
      currency: "GBP"
    });
  }

  displayAsJSON (object) {
    return <pre>{JSON.stringify(object, null, 2)}</pre>
  }
  
  /* get menu data
  ///////////////////////////////////////////*/

  getAllMenuItems () {
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

  addToCurrentPurchase (amount, id) {
    
    let currentPurchase;

    const initialCurrentPurchase = { items:
      { [id]: {id: id, quantity: amount} }
    }

    if (!this.state.currentPurchase) {
        currentPurchase = initialCurrentPurchase
      } else {
      if (amount > 0) {
        currentPurchase = Object.assign({}, this.state.currentPurchase, {
          items: Object.assign({}, this.state.currentPurchase.items, {
            [id]: {id: id, quantity: amount}
          })
        });
      } else {
        currentPurchase = this.state.currentPurchase
        delete currentPurchase.items[id]
      }
    }
    
    this.setState({
      currentPurchase: currentPurchase
    })
    // name: "Dave",
    // tel: "07901 972 811"
  }

  /* get purchase by id
  ///////////////////////////////////////////*/
 
  handlePurchaseId (event) {
    this.setState({ purchaseId: event.target.value  })
  }

  getPurchaseById (event) {
    event.preventDefault();
    const id = this.state.purchaseId;
    fetch(`/api/purchase/${id}`)
    .then(response => response.json())
    .then(purchase => {
      this.setState({ displayPurchaseById: purchase })
    })
    .catch(error => res.json({ error: error.message }));
  }

  /* add a single purchase
  ///////////////////////////////////////////*/

  addSinglePurchase (event) {
    //event.preventDefault();
    fetch('/api/purchase', {
      method: 'post',
      body: JSON.stringify(this.state.currentPurchase),
      headers: { 'Content-Type': 'application/json' }
    }
    ).then(response => response.json()
    ).then(orderId => {
      this.setState({ purchaseIdFromSuccess: orderId})
      this.getAllPurchases();
    })
    .catch(error => res.json({ error: error.message }));
  }

  /* get all purchases
  ///////////////////////////////////////////*/
 
  getAllPurchases () {
    fetch(`/api/purchases`)
    .then(response => response.json())
    .then(purchases => {
      this.setState({ purchases })
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
    
    const viewAllPurchases = this.state.currentPurchase &&
    <ViewAllPurchases 
      currentPurchase={this.state.currentPurchase}
      menu={this.state.menu}
    />

    const menuItems = this.state.menu && 
    <MenuItems 
      menuArray={this.getMenuArray()}
      getMenuItembyId={this.getMenuItembyId}
      getCurrency={this.getCurrency}
      addToCurrentPurchase={this.addToCurrentPurchase}
    />

    return (
      <React.Fragment>
        { viewPurchase }
        { viewAllPurchases }
        { menuItems }
      </React.Fragment>
    )
  }
}

export default App;