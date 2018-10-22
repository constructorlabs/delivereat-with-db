import React from 'react';
import Header from './Header';
import MenuItems from './MenuItems';
import ViewPurchase from './ViewPurchase';
import ViewPurchaseById from './ViewPurchaseById'; 
import '../styles/App.scss';
import '../styles/Tooltip.scss';

class App extends React.Component {
  constructor(){
    super();

    this.getCurrency = this.getCurrency.bind(this);
    this.getMenuArray = this.getMenuArray.bind(this);
    this.getMenuItembyId = this.getMenuItembyId.bind(this);
    this.receiveCurrentPurchase = this.receiveCurrentPurchase.bind(this);
    this.handlePurchaseId = this.handlePurchaseId.bind(this);
    this.getPurchaseById = this.getPurchaseById.bind(this);
    this.getAllMenuPurchases = this.getAllMenuPurchases.bind(this);
    this.getAllPurchases = this.getAllPurchases.bind(this);
    this.addSinglePurchase = this.addSinglePurchase.bind(this);
    this.resetPurchaseId = this.resetPurchaseId.bind(this);
    this.receiveFormInput = this.receiveFormInput.bind(this);
    this.togglePurchaseBasket = this.togglePurchaseBasket.bind(this);


    this.state = { 
      menu: null,
      menuPurchases: {},
      purchaseIdForGet: null,
      purchaseIdFromSuccess: null,
      displayPurchaseById: null,
      currentPurchase: null,
      purchaseBasketVisible: false,
      viewPurchaseId: window.location.search.split('viewPurchaseId=')[1]
    }
  }  

  // Main features
  ///////////////////////////////////////////
  // 1. Customer places an order
  // 2. Receive confirmation by text with a link to view the order online
  // 3. Customer can retreive an order by entering their order ID
  // 4. Admin can view all orders

  // initialise
  ///////////////////////////////////////////
 
  componentDidMount () {
    this.getAllMenuItems();
    this.getAllMenuPurchases();
    this.getAllPurchases();
  }

  // utilities
  ///////////////////////////////////////////
 
  getCurrency (string) {
    return string.toLocaleString("en-GB", {
      style: "currency", 
      currency: "GBP"
    });
  }

  displayAsJSON (object) {
    return <pre>{JSON.stringify(object, null, 2)}</pre>
  }
  
  // get menu data
  ///////////////////////////////////////////

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


  // get purchase by id
  ///////////////////////////////////////////
 
  handlePurchaseId (e) { // update purchaseId
    if (typeof e === 'string') {
      this.setState({ purchaseId: e });
    } else {
      this.setState({ purchaseId: e.target.value });
    }
  }

  getPurchaseById (event) { // fetch from /api/purchase/$id
    event.preventDefault();
    const id = this.state.purchaseId;
    if (!id.length || id === "0" || isNaN(id)) return;
    fetch(`/api/purchase/${id}`)
    .then(response => response.json())
    .then(purchase => {
      this.setState({ displayPurchaseById: purchase })
    })
    .catch(error => res.json({ error: error.message }));
  }

  receiveCurrentPurchase (currentPurchase) { // receive currentPurchase from MenuItems
    this.setState({ currentPurchase })
  }

  // add a single purchase
  ///////////////////////////////////////////

  addSinglePurchase (event) {
    event.preventDefault();
    if (!this.state.currentPurchase.name || !this.state.currentPurchase.telephone) return;
    fetch('/api/purchase', {
      method: 'post',
      body: JSON.stringify(this.state.currentPurchase),
      headers: { 'Content-Type': 'application/json' }
    }
    ).then(response => response.json()
    ).then(orderId => {
      this.setState({ purchaseIdFromSuccess: orderId })
      this.getAllMenuPurchases();
      this.getAllPurchases();
    })
    .catch(error => res.json({ error: error.message }));
  }

  resetPurchaseId () {
    this.setState({ 
      purchaseIdFromSuccess: null,
      currentPurchase: null
    })
  }

  receiveFormInput (event) {
    const currentPurchase = Object.assign({}, this.state.currentPurchase, {[event.target.name]: event.target.value})
    this.setState({ currentPurchase })
  }

  // get all menu_purchases
  ///////////////////////////////////////////
 
  getAllMenuPurchases () {
    fetch(`/api/menu_purchases`)
    .then(response => response.json())
    .then(menuPurchases => {
      this.setState({ menuPurchases })
    })
    .catch(error => res.json({ error: error.message }));
  }  
  
  // get all purchases
  ///////////////////////////////////////////
 
  getAllPurchases () {
    fetch(`/api/purchases`)
    .then(response => response.json())
    .then(purchases => {
      this.setState({ purchases })
    })
    .catch(error => res.json({ error: error.message }));
  }

  togglePurchaseBasket (event) {
    event.preventDefault();
    if (this.state.currentPurchase) {
      this.setState({ purchaseBasketVisible: !this.state.purchaseBasketVisible });
    }
  }

  render() {

    const header = 
    <Header
      currentPurchase={this.state.currentPurchase}
      togglePurchaseBasket={this.togglePurchaseBasket}
    />  

    // customer views their purchase
    const viewPurchaseById = this.state.viewPurchaseId &&
    <ViewPurchaseById 
      purchases={this.state.purchases}
      viewPurchaseId={this.state.viewPurchaseId}
      getPurchaseById={this.getPurchaseById}
      handlePurchaseId={this.handlePurchaseId}
      displayPurchaseById={this.state.displayPurchaseById}
      getCurrency={this.getCurrency}
      menu={this.state.menu}
    />    
    
    // view basket (currentPurchase)
    const viewPurchase = this.state.currentPurchase && this.state.purchaseBasketVisible &&
    <ViewPurchase 
      resetPurchaseId={this.resetPurchaseId}
      purchaseIdFromSuccess={this.state.purchaseIdFromSuccess}
      receiveFormInput={this.receiveFormInput}
      addSinglePurchase={this.addSinglePurchase}
      currentPurchase={this.state.currentPurchase}
      getCurrency={this.getCurrency}
      menu={this.state.menu}
    />

    const menuItems = this.state.menu && 
      <MenuItems 
        menuArray={this.getMenuArray()}
        getMenuItembyId={this.getMenuItembyId}
        getCurrency={this.getCurrency}
        currentPurchase={this.state.currentPurchase}
        receiveCurrentPurchase={this.receiveCurrentPurchase}
      />

    return (
      <React.Fragment>
        { header }
        { viewPurchaseById }
        { viewPurchase }
        { menuItems }
      </React.Fragment>
    )
  }
}

export default App;