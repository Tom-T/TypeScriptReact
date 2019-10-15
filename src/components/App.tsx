import React, { SyntheticEvent } from "react";
import { ItemState } from "../interfaces/items";
import Items from "./Items";
import ModalWarning from "./ModalWarning";

export default class App extends React.Component<{}, ItemState> {
  state: ItemState = {
    items: [],
    modalIsOpen: false,
    warningMessage: ""
  };
  componentDidMount = () => {
    try {
      const savedData: ItemState = JSON.parse(localStorage.getItem("Mydata") as string);
      if (savedData) this.setState(() => savedData);
    } catch (e) {
      return;
    }
  };
  componentDidUpdate = (prevState: ItemState) => {
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
  handleclearWarning = () => {
    this.setState(() => ({ warningMessage: "" }));
  };
  handleAddItem = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      newItem: { value: string };
    };
    const newItem = target.newItem.value.trim(); // typechecks!

    target.newItem.value = "";

    if (!newItem) return this.setState(() => ({ warningMessage: "Please provide an item" }));

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
        <ModalWarning clearWarning={this.handleclearWarning} warningMessage={this.state.warningMessage} />
      </div>
    );
  };
}
