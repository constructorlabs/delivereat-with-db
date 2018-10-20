import React from 'react';
import MenuItems from './MenuItems';
import ViewPurchaseById from './ViewPurchaseById'; 
import ViewPurchase from './ViewPurchase';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.getCurrency = this.getCurrency.bind(this);
    this.getMenuArray = this.getMenuArray.bind(this);
    this.getMenuItembyId = this.getMenuItembyId.bind(this);
    this.receiveCurrentPurchase = this.receiveCurrentPurchase.bind(this);
    this.handlePurchaseId = this.handlePurchaseId.bind(this);
    this.getPurchaseById = this.getPurchaseById.bind(this);
    this.getAllPurchases = this.getAllPurchases.bind(this);
    this.addSinglePurchase = this.addSinglePurchase.bind(this);

    this.handleMenuSelection = this.handleMenuSelection.bind(this);
    this.menuSelectionCheckboxes = this.menuSelectionCheckboxes.bind(this);

    this.state = { 
      menu: {},
      purchases: {},
      purchaseIdForGet: null,
      purchaseIdFromSuccess: null,
      displayPurchaseById: null,
      currentPurchase: null
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
    this.getAllPurchases();
    // this.addSinglePurchase();
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

  handleMenuSelection(course, event) {
    console.log(course, event.target.checked);
  }

  menuSelectionCheckboxes() {
    const coursesArray = ["starter", "main", "dessert"];
    coursesArray.map(course => {
      const input = course;// <input key={course} type="checkbox" onChange={(event) => this.handleMenuSelection(course, event)} />;
      console.log(input)
      return input;
    })
  }

  // get purchase by id
  ///////////////////////////////////////////
 
  handlePurchaseId (event) { // update purchaseId
    this.setState({ purchaseId: event.target.value  })
  }

  getPurchaseById (event) { // fetch from /api/purchase/$id
    event.preventDefault();
    const id = this.state.purchaseId;
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

  render() {

    // customer views their purchase
    const viewPurchaseById = 
    <ViewPurchaseById 
      getPurchaseById={this.getPurchaseById}
      handlePurchaseId={this.handlePurchaseId}
      displayPurchaseById={this.state.displayPurchaseById}
    />    
    
    // view basket (currentPurchase) 
    const viewPurchase = this.state.currentPurchase &&
    <ViewPurchase 
      currentPurchase={this.state.currentPurchase}
      getCurrency={this.getCurrency}
      menu={this.state.menu}
    />

    const menuCheckboxes = this.state.menu && this.menuSelectionCheckboxes();

    const menuItems = this.state.menu && 
      <MenuItems 
        // courses={courses}
        menuArray={this.getMenuArray()}
        getMenuItembyId={this.getMenuItembyId}
        getCurrency={this.getCurrency}
        currentPurchase={this.state.currentPurchase}
        receiveCurrentPurchase={this.receiveCurrentPurchase}
      />

    return (
      <React.Fragment>
        { viewPurchaseById }
        { viewPurchase }
        { menuCheckboxes }
        { menuItems }
      </React.Fragment>
    )
  }
}

export default App;