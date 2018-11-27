import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../styles/MenuItem.scss';

function MenuItem({ menuItem, addToOrder, removeFromOrder, order, stage }) {
  const inBasket = order.items.length && order.items.map((item) => item[0]).includes(menuItem.id);
  const count = inBasket ? order.items.filter((item) => item[0] === menuItem.id)[0][1] : 0;
  const classesWrapper = cx('menu-item', {
    'menu-item--in-basket': inBasket,
    'menu-item--greyed-out': stage === 'basket',
  });
  const classesRemove = cx('menu-item__remove-button', {
    'menu-item__remove-button--in-basket': inBasket,
  });
  const classesCount = cx('menu-item__count', { 'menu-item__count--in-basket': inBasket });

  return (
    <div className={classesWrapper}>
      <div className="menu-item__title">
        <div className="menu-item__name">{menuItem.name}</div>
        <div className="menu-item__buttons">
          <button
            className={classesRemove}
            type="button"
            onClick={() => removeFromOrder(menuItem.id)}
          >
            <i className="fas fa-minus-circle" />
          </button>
          <div className={classesCount}>{count}</div>
          <button
            className="menu-item__add-button"
            type="button"
            onClick={() => addToOrder(menuItem.id)}
          >
            <i className="fas fa-plus-circle" />
          </button>
        </div>
      </div>
      <div className="menu-item__description">{menuItem.description}</div>
      <div className="menu-item__price">{`£${menuItem.price}`}</div>
    </div>
  );
}

MenuItem.propTypes = {
  stage: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
  menuItem: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
  removeFromOrder: PropTypes.func.isRequired,
};

export default MenuItem;
