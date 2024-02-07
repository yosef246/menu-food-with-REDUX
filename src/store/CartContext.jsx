import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItem: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updateItems = [...state.items]; //שווה לכל המידע שכבר היה לי

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex]; //שווה למוצר ספציפי
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1, //מוסיף לאותו מוצר ספציפי פלוס אחד בכמות
      };
      updateItems[existingCartItemIndex] = updateItem; //מוסיף לרשימה עם כל המידע שכבר היה ,במקום שהמזהה שלי שווה ,את המוצר החדש + הכמות החדשה של המוצר החדש
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updateItems }; //מחזיר את כל המידע שכבר קיים + הרשימה של המידע המעודכנת
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updateItems = [...state.items]; //שווה לכל המידע שכבר היה לי

    if (existingCartItem.quantity === 1) {
      updateItems.splice(existingCartItemIndex, 1); //מסיר לי מוצר 1 כמו שהגדרתי והמוצר שיוסר זה המוצר שהגדרתי
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updateItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updateItems };
  }

  if (action.type === "CLEAR_ITEM") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearItem() {
    dispatchCartAction({ type: "CLEAR_ITEM" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
