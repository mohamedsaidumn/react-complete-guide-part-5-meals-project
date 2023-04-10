import React, { Context } from "react";
import { ItemType } from "../types/types";

interface CartContextType {
  items: ItemType[];
  totalAmount: number;
  addItem: (item: ItemType) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext: Context<CartContextType> =
  React.createContext<CartContextType>({
    items: [],
    totalAmount: 0,
    addItem: (item: ItemType) => {},
    removeItem: (id: string) => {},
    clearCart: () => {},
  });

export default CartContext;
