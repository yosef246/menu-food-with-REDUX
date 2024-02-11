import Modal from "./UI/Modal";
import currencyFormatter from "../Util/formatting";
import Input from "./UI/Input";
import Button from "./UI/button";
import { userProgressActions } from "../store/UseProgressContext";
import { cartActions } from "../store/CartContext";
import { useSelector, useDispatch } from "react-redux";

function CheckOut() {
  const dispatch = useDispatch();
  const progressCheckout = useSelector((state) => state.userProgress.progress);
  const cartItems = useSelector((state) => state.cart.items);

  function handleClose() {
    dispatch(userProgressActions.HideCheckOut());
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target); //אחראי על טפסי ופה הוא לוקח את המידע HTML
    const customerData = Object.fromEntries(fd.entries()); //קורא לערכים לתוך המשתנה הנ"ל

    fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify({
        order: {
          item: cartItems,
          customer: customerData,
        },
      }),
      headers: {
        "Content-Type": "application/JSON",
      },
    });

    dispatch(userProgressActions.HideCheckOut());
    dispatch(cartActions.clearItem());
  }

  return (
    <Modal open={progressCheckout === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>
          Total Amount:
          {currencyFormatter.format(cartItems.quantity * cartItems.price)}
        </p>

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
