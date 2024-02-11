import React, { Fragment } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";

function App() {
  return (
    <Fragment>
      <Header />
      <Meals />
      <Cart />
      <CheckOut />
    </Fragment>
  );
}

export default App;
