import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../styles/BasketItem.scss";

library.add(faPlus, faMinus);

function BasketItem(props){
const {id,name, quantity, price} = props

const subTotal=price*quantity;

  function handleClickMinus(){
    props.receiveMinusQuantity(id);


  }
  function handleClickPlus(){
    props.receivePlusQuantity(id);

  }

return(
  <div className="item">
        <div className="quantity">

        <FontAwesomeIcon icon="minus" onClick={handleClickMinus} />
         {quantity}
        <FontAwesomeIcon icon="plus" onClick={handleClickPlus} />
        </div>
        <p>{name}</p>
        <p>{subTotal.toLocaleString("en-UK", {
          style: "currency",
          currency: "GBP"})}</p>
  </div>
)

}

export default BasketItem;
