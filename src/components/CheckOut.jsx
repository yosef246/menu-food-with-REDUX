import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import currencyFormatter from "../Util/formatting";
import Input from "./UI/Input";
import Button from "./UI/button";
import UserProgressContext from "../store/UseProgressContext";

function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.HideCheckOut();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target); //אחראי על טפסי ופה הוא לוקח את המידע HTML
    const customerData = Object.fromEntries(fd.entries()); //קורא לערכים לתוך המשתנה הנ"ל

    fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify({
        order: {
          item: cartCtx.items,
          customer: customerData,
        },
      }),
      headers: {
        "Content-Type": "application/JSON",
      },
    });

    userProgressCtx.HideCheckOut();
    cartCtx.clearItem();
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button onClick={handleClose} type="button" textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
export default CheckOut;
