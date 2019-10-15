import React, { SyntheticEvent } from "react";
import { ItemStateFunc } from "../interfaces/items";


const Item = (props: {
  handleRemoveItem(e: SyntheticEvent): void;
  handleCompletedToggle(e: SyntheticEvent): void;
  itemText: string;
  itemCompleted: boolean;
  itemIndex: number;
}) => {
  return (
    <div>
      <p style={{ textDecoration: !props.itemCompleted ? "none" : "line-through" }}>{props.itemText}</p>
      <button value={props.itemIndex} onClick={props.handleRemoveItem}>
        {props.itemCompleted ? "Removed completed Task" : "Remove incomplete Task"}
      </button>

      <button value={props.itemIndex} onClick={props.handleCompletedToggle}>
        {props.itemCompleted ? "Mark Incomplete" : "Mark Completed"}
      </button>
    </div>
  );
};
const Items = (props: ItemStateFunc) => {
  return (
    <div>
      {props.items.map((item: { task: string; completed: boolean }, index: number) => (
        <Item
          key={index}
          itemText={item.task}
          itemCompleted={item.completed}
          itemIndex={index}
          handleRemoveItem={props.handleRemoveItem}
          handleCompletedToggle={props.handleCompletedToggle}
        />
      ))}
    </div>
  );
};
export default Items