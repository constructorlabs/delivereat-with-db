import React from 'react';
import MenuItem from './MenuItem.js'
import AddOrderModal from './AddOrderModal.js'
import Order from './Order.js'

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      menu: [],
      modalOpen: false,
      modalDetails: "",
      order: {},
      total: "",
      orderNo: 0
    }

    this.menuCall = this.menuCall.bind(this);
    this.itemCall = this.itemCall.bind(this);
    this.receiveModal = this.receiveModal.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.submitOrderPost = this.submitOrderPost.bind(this);
    this.clearOrder = this.clearOrder.bind(this);
    this.receiveRemoveItem = this.receiveRemoveItem.bind(this);
    this.receiveModalCloseBtn = this.receiveModalCloseBtn.bind(this);
    // this.updateQuantity = this.updateQuantity.bind(this);
  }

componentDidMount(){
  this.menuCall();
}

menuCall(){
  fetch('/api/menu')
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        menu: body
      })
    })
}

itemCall(menuId){
  fetch(`/api/menu/${menuId}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        modalDetails: body
      })
    })
}

submitOrderPost(name, address, telephone){
  const order = {name, address, telephone, items: this.state.order};
  fetch(`/api/order`, {method:"POST", headers: {
            "Content-Type": "application/json; charset=utf-8",
        }, body: JSON.stringify(order)})
        //two then statements
        .then(response => response.json())
        .then(response => this.setState({
          orderNo: response.orderId
        },
    () => window.alert(`Your order number ${this.state.orderNo} is on its way - Listen for the doorbell!`)
  ))
        this.setState({
          order: {}
        })

}

clearOrder(){
  this.setState({
    order: {}
  })
}

// remember to pass this down through props
// updateQuantity(id, value){
//   update the quantity of the relevant item in the Object
//   const updateOrder = Object.assign({}, this.state.order);
//   updateOrder[id] = {id: value}
//   this.state.order[]
//   this.setState({
//
//   })
// }

receiveRemoveItem(itemId){
  // const orderArray = Object.entries(this.state.order)
  // const filteredOrder = ordersArray.filter(([itemId, quantity]) => {
  //   return itemId !== itemId.toString()
  // })
  const newOrder = Object.assign({}, this.state.order);

  delete newOrder[itemId];

  this.setState({
    order: newOrder
  })
}

receiveModal(menuItemId){
  this.itemCall(menuItemId);
  this.setState({
    modalOpen: true
  })
}

updateOrder(itemId, itemQuantity){
  const newOrder = Object.assign({}, this.state.order);

  if (newOrder[itemId]) {
    newOrder[itemId] = newOrder[itemId] + itemQuantity
  } else {
    newOrder[itemId] = itemQuantity
  }
  this.setState({
    order: newOrder,
  })
}

receiveModalCloseBtn(){
  this.setState({
    modalOpen: false,
  })
}

modalOutsideClick(event){
        if(event.target.className == "modal2"){
          this.setState({
              modalOpen: false,
          })
    }
  }


  render(){
    return (
      <div onClick={this.modalOutsideClick}>
        <header><h1>DIABETES</h1></header>
        {this.state.menu.map( menuItem => {
          return(
          <MenuItem key={menuItem.id}
            menuItem={menuItem} receiveModal={this.receiveModal}
          />
        );
      })}
      <AddOrderModal receiveModalCloseBtn={this.receiveModalCloseBtn} modalDetails={this.state.modalDetails} className= {this.state.modalOpen ? "modal2" : "modal"} updateOrder={this.updateOrder}/>
      {Object.values(this.state.order).length > 0 ? <Order receiveRemoveItem={this.receiveRemoveItem} clearOrder={this.clearOrder} order={this.state.order} menu={this.state.menu} submitOrder={this.submitOrderPost}/> : null }
      </div>
    )
  }
}

export default App;
