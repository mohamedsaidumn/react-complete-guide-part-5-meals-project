import React, { useReducer, ReactNode } from "react";
import { ItemType } from "../types/types";
import { CartType } from "../types/types";

import CartContext from "./cart-context";

interface CartProviderProps {
  children: ReactNode;
}

type CartActionType =
  | {
      type: "ADD";
      item: ItemType;
    }
  | {
      type: "REMOVE";
      id: string;
    };

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: CartType, action: CartActionType) => {
  if (action.type === "ADD") {
    const newTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem: ItemType = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem !== undefined) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const newState = { items: updatedItems, totalAmount: newTotalAmount };

    return newState;
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex: number = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem: ItemType = state.items[existingCartItemIndex];
    const updatedTotalAmount: number = state.totalAmount - existingItem.price;
    let updatedItems: ItemType[];
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem: ItemType = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    const newState = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };

    return newState;
  }

  return defaultCartState;
};

const CartProvider = (props: CartProviderProps) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: ItemType) => {
    dispatchCartAction({ type: "ADD", item: item });
    console.log(cartState.items);
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
