import React from "react";
import currencyFormatter from "../Util/formatting";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/CartContext";

function CartItem(props) {
  const dispatch = useDispatch();
  const { id, name, quantity, price } = props.item;

  function onDecrease() {
    dispatch(cartActions.removeItem(id));
  }

  function onIncrease() {
    dispatch(cartActions.addItem({ id, name, price }));
  }

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}

export default CartItem;
