import React from 'react';
import { log } from 'util';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            numbersItemsInBasket: 0
        }
        // this.handleClick = this.handleClick.bind(this);
        // this.fetchCurrentBasket = this.fetchCurrentBasket.bind(this);
    }

    // handleClick () {        
    //     fetch('/order', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //         },
    //         body: JSON.stringify(this.props.currentBasket)
    //     })
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((body) => {
    //         // console.log(body);
    //     });
    //     this.props.clearBasket();
      
    // }

    // fetchCurrentBasket() {
    //     fetch('/basket')
    //       .then((response) => {
    //         return response.json();
    //       })
    //       .then((body) => {
    //           console.log(body);
    //       });
    //   }
    
    
    render() {        
        // console.log( this.props.currentBasket);
        let quantity = 0;
        let totalprice = 0;
        this.props.currentBasket.forEach(element => {
            // console.log(element);
            totalprice += element.price * element.quantity;
            quantity += element.quantity;
        });        
        
        return (
            <nav className='header container'>
                <h1 className='header__title'>MARIO BURGERS</h1>
                <span className='header__basketQuantity'>£{this.props.totalprice} ({this.props.quantity}) + {this.props.deliveryCharge} </span>
                {/* <button onClick={this.handleClick}>Order!</button>
                <p onClick={this.fetchCurrentBasket} >fetch</p> */}
            </nav>
        )
    }
}

export default Header;