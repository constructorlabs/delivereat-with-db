import React from 'react';
import PropTypes from 'prop-types';
import '../styles/BasketItem.scss';

function BasketItem({ menu, addToOrder, removeFromOrder, basketItem }) {
  const { name } = menu.find((item) => item.id === basketItem[0]);
  const { price } = menu.find((item) => item.id === basketItem[0]);

  return (
    <div className="basket-item">
      <div className="basket-item__title">
        <div className="basket-item__name">{name}</div>
        <div className="basket-item__buttons">
          <button
            className="basket-item__remove-button"
            type="button"
            onClick={() => removeFromOrder(basketItem[0])}
          >
            <i className="fas fa-minus-circle" />
          </button>
          <div className="basket-item__count">{basketItem[1]}</div>
          <button
            className="basket-item__add-button"
            type="button"
            onClick={() => addToOrder(basketItem[0])}
          >
            <i className="fas fa-plus-circle" />
          </button>
          <div className="basket-item__line-total">{`£${(price * basketItem[1]).toFixed(2)}`}</div>
        </div>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  menu: PropTypes.array.isRequired,
  basketItem: PropTypes.array.isRequired,
  addToOrder: PropTypes.func.isRequired,
  removeFromOrder: PropTypes.func.isRequired,
};

export default BasketItem;
