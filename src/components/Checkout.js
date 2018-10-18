import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import '../styles/Checkout.scss';

function Checkout({orderId, changeStage}) {

  return (
    <div className='checkout' onClick={()=>changeStage('menu')}>
      <p className='checkout__logo'>Zing</p>
      <p className='checkout__text'>
        Thank you for placing an order with Zing. Your order
        number is {orderId}. One of our surprisingly attractive 
        baristas is preparing your coffee now.
      </p>
    </div>
  );
}

export default Checkout;