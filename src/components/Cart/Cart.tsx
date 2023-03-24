import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { ItemType } from "../../types/types";

interface CartProps {
  onClose: () => void;
}

const Cart = (props: CartProps) => {
  const cartCtx = useContext(CartContext);
  const totalAmount: string = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems: boolean = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    console.log("Bye");
  };

  const cartItemAddHandler = (item: ItemType) => {
    console.log("Helllloooo");
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
