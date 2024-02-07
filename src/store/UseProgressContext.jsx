import { createContext, useReducer, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  HideCart: () => {},
  showCheckOut: () => {},
  HideCheckOut: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }
  function HideCart() {
    setUserProgress("");
  }
  function showCheckOut() {
    setUserProgress("checkout");
  }
  function HideCheckOut() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    HideCart,
    showCheckOut,
    HideCheckOut,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
