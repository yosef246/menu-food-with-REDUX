import logoImg from "../assets/logo.jpg";
import Button from "./UI/button";
import { useSelector, useDispatch } from "react-redux";
import { userProgressActions } from "../store/UseProgressContext";

export default function Header() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  function handleShowCart() {
    dispatch(userProgressActions.showCart());
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalQuantity})
        </Button>
      </nav>
    </header>
  );
}
