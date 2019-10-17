import React, { SyntheticEvent, CSSProperties } from "react";
import { ItemStateFunc } from "../interfaces/items";

const returnStyle = (completed: boolean) => {
  if (completed) {
    return {
      textDecoration: "none",
      opacity: 1
    } as CSSProperties;
  } else {
    return {
      textDecoration: "line-through",
      opacity: 0.55
    } as CSSProperties;
  }
};

const Item = (props: {
  handleRemoveItem(e: SyntheticEvent): void;
  handleCompletedToggle(e: SyntheticEvent): void;
  itemText: string;
  itemCompleted: boolean;
  itemIndex: number;
}) => (
  <div>
    <div className="card width-18em">
      <div className="card-title">
        {/* <h3>{props.itemCompleted ? "Completed Task" : "Incomplete Task"}</h3> */}
        <button
          type="button"
          className="close closetask btn float-right card-title zindex-modal"
          aria-label="Close"
          value={props.itemIndex}
          onClick={props.handleRemoveItem}
          title={props.itemCompleted ? "Removed completed Task" : "Remove incomplete Task"}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="card-body" id={props.itemIndex.toString()} onClick={props.handleCompletedToggle}>
        <p className="card-text" style={returnStyle(!props.itemCompleted)}>
          {props.itemText}
        </p>
      </div>
    </div>
  </div>
);

const Items = (props: ItemStateFunc) => (
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
export default Items;
