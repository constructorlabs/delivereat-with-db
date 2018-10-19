import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";


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
  <div>

        <FontAwesomeIcon icon="minus" onClick={handleClickMinus} />
         {quantity}
        <FontAwesomeIcon icon="plus" onClick={handleClickPlus} />
        <p>{name}</p>
        <p>{subTotal.toLocaleString("en-UK", {
          style: "currency",
          currency: "GBP"})}</p>
  </div>
)

}

export default BasketItem;
