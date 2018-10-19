import React from 'react';
import BasketItem from './BasketItem';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import '../styles/Basket.scss';

function Basket({total,menu,changeStage,checkout,order,stage,addToOrder,removeFromOrder,getInput,readyToCheckout}) {
  
  const deliveryCharge = (total >= 10) ? 0 : 2;
  const deliveryText = (total >= 10) ? 'Free delivery' : 'Delivery charge';
  const countItems = order.items.map(item => item[1]).reduce((a,b)=>(a+b));
  const basketDetailsClasses = cx('basket-details',{'basket-details--visible': (stage === 'basket')});
  const basketSummaryClasses = cx('basket-summary',{'basket-summary--visible': !(stage === 'basket')})
  const checkoutClasses = cx('basket-checkout',{'basket-checkout--visible': (stage === 'basket'), 'basket-checkout--ready': readyToCheckout});

  return (
    <div className={'basket'}>
      <div className={basketDetailsClasses}>
        <div className='basket-details__close' onClick={()=>changeStage('menu')}>&times;</div>
        {order.items.map(item => 
        <BasketItem 
          key={item[0]} 
          menu={menu}
          basketItem={item} 
          addToOrder={addToOrder} 
          removeFromOrder={removeFromOrder} />)}
        <div className='basket-details__delivery'>
          <div className='basket-details__delivery-text'>{deliveryText}</div>
          <div className='basket-details__delivery-price'>{`£${(deliveryCharge).toFixed(2)}`}</div>
        </div>
        <div className='basket-details__total'>
          <div className='basket-details__total-text'>Order total</div>
          <div className='basket-details__total-price'>{`£${(total+deliveryCharge).toFixed(2)}`}</div>
        </div>
        <div className='basket-details__phone'>
          <div className='basket-details__phone-text'>Enter phone number:</div>
          <div className='basket-details__phone-number'>
            <div className='basket-details__phone-country'>+44</div>
            <input className='basket-details__phone-input' type='text' placeholder='Phone number' onChange={(event)=>getInput(event.target.value)}></input>
          </div>
        </div>
      </div>
      <div className={basketSummaryClasses} onClick={()=>changeStage('basket')}>
        <div className={'basket-summary__count'}>{countItems}</div>
        <div className={'basket-summary__text'}>View Basket</div>
        <div className={'basket-summary__total'}>{`£${total.toFixed(2)}`}</div>
      </div>
      <div className={checkoutClasses} onClick={()=>checkout()}>Checkout</div>
    </div>
  );
}

Basket.propTypes = {
  total: PropTypes.number.isRequired,
  stage: PropTypes.string.isRequired,
  menu: PropTypes.array.isRequired,
  changeStage: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
  removeFromOrder: PropTypes.func.isRequired,
  getInput: PropTypes.func.isRequired,
  readyToCheckout: PropTypes.bool.isRequired
};

export default Basket;