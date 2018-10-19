import React from 'react';
import MenuItems from './MenuItems';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
    this.getMenuArray = this.getMenuArray.bind(this);
    this.getMenuItembyId = this.getMenuItembyId.bind(this);
    this.handlePurchaseId = this.handlePurchaseId.bind(this);
    this.getPurchaseById = this.getPurchaseById.bind(this);
    this.state = { 
      menu: {},
      getPurchaseID: null,
      displayPurchaseByID: null
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
    .catch(error => res.json({ error: error.message }));
  }

  /* get purchase by id
  ///////////////////////////////////////////*/
 
  handlePurchaseId (event) {
    this.setState({ getPurchaseID: event.target.value  })
  }

  getMenuArray () {
    return Object.values(this.state.menu);
  }

  getMenuItembyId (id) {
    return this.state.menu[id];
  }

  getPurchaseById (event) {
    event.preventDefault();
    const id = this.state.getPurchaseID;
    fetch(`/api/purchase/${id}`)
    .then(response => response.json())
    .then(purchase => {
      this.setState({ displayPurchaseByID: purchase })
    })
    .catch(error => res.json({ error: error.message }));
  }

  render() {

    const inputPurchaseId = 
    <form onSubmit={this.getPurchaseById}>
      <h2>View your order:</h2>
      ID: <input onChange={this.handlePurchaseId} type="text" name="purchaseId" />
      <button type="submit">Show purchase</button>
    </form>

    const displayPurchaseID = this.state.displayPurchaseByID &&
    Object.values(this.state.displayPurchaseByID).map(item => {
        const purchaseID = `purchaseId-${item.id}`;
        return (
        <ul key={purchaseID}>
          <li>menu_purchase_id: {item.id}</li>
          <li>quantity: {item.quantity}</li>
          <li>menu_id: {item.menu_id}</li>
          <li>purchase_id: {item.purchase_id}</li>
        </ul>)
    });

    const menuItems = this.state.menu && 
    <MenuItems 
      menuArray={this.getMenuArray()}
      getMenuItembyId={this.getMenuItembyId}
    />
    return (
      <React.Fragment>
        { inputPurchaseId }
        { displayPurchaseID }
        {/* { menuItems } */}
      </React.Fragment>
    )
  }
}

export default App;