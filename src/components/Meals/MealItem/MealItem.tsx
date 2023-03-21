import React from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";

interface MealItemProps {
  id: string;
  price: number;
  name: string;
  description: string;
}

const MealItem = (props: MealItemProps) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
