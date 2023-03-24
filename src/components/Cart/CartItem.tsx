import React, { SyntheticEvent } from "react";
import classes from "./CartItem.module.css";
import { ItemType } from "../../types/types";

interface CartItemProps {
  name: string;
  amount: number;
  price: number;
  onAdd: any;
  onRemove: any;
}

const CartItem = (props: CartItemProps) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
