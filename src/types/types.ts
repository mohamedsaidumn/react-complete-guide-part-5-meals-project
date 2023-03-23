import React from "react";

export type ItemType = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

export type CartType = {
  items: ItemType[];
  totalAmount: number;
};
