import React from "react";
import Modal from "./UI/Modal";
import currencyFormatter from "../Util/formatting";
import Button from "./UI/button";
import { userProgressActions } from "../store/UseProgressContext";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const progressCart = useSelector((state) => state.userProgress.progress);

  const cartTotal = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    dispatch(userProgressActions.HideCart());
  }

  function handleGoToCheckout() {
    dispatch(userProgressActions.showCheckOut());
  }

  return (
    <Modal className="cart" open={progressCart === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            id={item.id}
            item={{
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            }}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartItems.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go To CheckOut</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
