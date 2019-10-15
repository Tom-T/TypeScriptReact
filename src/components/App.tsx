import React, { ReactPropTypes, SyntheticEvent } from "react";
import {ItemState, ItemStateFunc} from "../interfaces/items"
import Items from "./Items"

export default class App extends React.Component<{}, ItemState> {
  state: ItemState = {
    items: []
  };
  componentDidMount = () => {
    console.log("Loading Data");
    try {
      const savedData: ItemState = JSON.parse(localStorage.getItem("Mydata") as string);
      if (savedData) this.setState(Prevstate => savedData);
    } catch (e) {
      return;
    }
  };
  componentDidUpdate = (prevState: ItemState) => {
    console.log("Saving Data");
    const newData = JSON.stringify(this.state);
    if (JSON.stringify(prevState) !== newData) localStorage.setItem("Mydata", newData);
  };
  handleCompletedToggle = (e: SyntheticEvent) => {
    e.preventDefault();
    const thisIndex: number = parseInt(e.currentTarget.getAttribute("value") as string);

    this.setState(state => {
      let newState = this.state;
      newState.items[thisIndex].completed = !this.state.items[thisIndex].completed;
      return newState;
    });
  };
  handleRemoveItem = (e: SyntheticEvent) => {
    e.preventDefault();
    let newSet: { task: string; completed: boolean }[] = [];
    newSet = this.state.items.filter((value: { task: string; completed: boolean }, index: number) => {
      return (index as number) !== parseInt(e.currentTarget.getAttribute("value") as string);
    });

    this.setState(state => ({ items: newSet }));
  };
  handleRemoveAll = (e: SyntheticEvent) => {
    e.preventDefault();
    this.setState(state => ({ items: [] }));
  };
  handleAddItem = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      newItem: { value: string };
    };
    const newItem = target.newItem.value.trim(); // typechecks!

    target.newItem.value = "";

    if (!newItem) alert("Please provide an item");

    this.setState(state => ({ items: state.items.concat({ task: newItem, completed: false }) }));
  };
  render = () => {
    return (
      <div>
        <h1>Todo List</h1>
        <div>
          <Items
            items={this.state.items}
            handleRemoveItem={this.handleRemoveItem}
            handleCompletedToggle={this.handleCompletedToggle}
          />
        </div>
        <div>
          <form onSubmit={this.handleAddItem}>
            <input type="text" name="newItem" />
            <button>Add Item</button>
          </form>
        </div>
      </div>
    );
  };
}
