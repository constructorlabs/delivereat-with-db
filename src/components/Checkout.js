import React from 'react';
import '../styles/Checkout.scss';
import PropTypes from 'prop-types';

function Checkout({ orderId, changeStage }) {
  return (
    <div className="checkout" role="button" tabIndex={0} onClick={() => changeStage('menu')}>
      <p className="checkout__logo">Zing</p>
      <p className="checkout__text">
        Thank you for placing an order with Zing. Your order number is {orderId}. One of our
        surprisingly attractive baristas is preparing your coffee now.
      </p>
    </div>
  );
}

Checkout.propTypes = {
  changeStage: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
};

export default Checkout;
