import React, { SyntheticEvent } from "react";
import { ItemState } from "../interfaces/items";
import Items from "./Items";
import ModalWarning from "./ModalWarning";
import { ProgressBar } from "react-bootstrap";

export default class App extends React.Component<{}, ItemState> {
  state: ItemState = {
    items: [],
    modalIsOpen: false,
    warningMessage: "",
    progress: 0
  };
  componentDidMount = () => {
    try {
      const savedData: ItemState = JSON.parse(localStorage.getItem("Mydata") as string);
      if (savedData) this.setState(() => savedData);
    } catch (e) {
      return;
    }
  };
  getPercentage = () => {
    const myComplete = this.state.items.filter(task => task.completed).length;
    const myTotal = this.state.items.length;
    return myComplete ? Math.round((myComplete / myTotal) * 100) : 1;
  };

  componentDidUpdate = (prevState: ItemState) => {
    this.state.progress = this.getPercentage();
    const newData = JSON.stringify(this.state);
    if (JSON.stringify(prevState) !== newData) localStorage.setItem("Mydata", newData);
  };
  handleCompletedToggle = (e: SyntheticEvent) => {
    e.preventDefault();
    let thisIndex: number = -1;
    if (e.currentTarget.hasAttribute("value")) {
      thisIndex = parseInt(e.currentTarget.getAttribute("value") as string);
    } else if (e.currentTarget.hasAttribute("id")) {
      thisIndex = parseInt(e.currentTarget.getAttribute("id") as string);
    } else {
      return { error: "Unable to find which task to complete" };
    }

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

  render = () => (
    <div className="container">
      <div className="navbar navbar-dark bg-dark navbar-expand-md fixed-top sticky-top">
        <form onSubmit={this.handleAddItem}>
          <input type="text" name="newItem" />
          <button>Add Item</button>
        </form>
        <header className="header">
          <h1>Todo List</h1>
        </header>
        <ProgressBar animated now={this.getPercentage()}></ProgressBar>
      </div>
      <div>
        <Items
          items={this.state.items}
          handleRemoveItem={this.handleRemoveItem}
          handleCompletedToggle={this.handleCompletedToggle}
        />
      </div>

      <ModalWarning clearWarning={this.handleclearWarning} warningMessage={this.state.warningMessage} />
    </div>
  );
}
