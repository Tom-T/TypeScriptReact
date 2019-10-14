import React, { ReactPropTypes, SyntheticEvent } from "react";
import { string } from "prop-types";

interface ItemState {
  items: string[];
}

interface ItemStateFunc extends ItemState {
  handleRemoveItem(e: SyntheticEvent): void;
}

class Item extends React.Component<{ handleRemoveItem(e: SyntheticEvent): void; itemText: string; itemIndex: number }> {
  render() {
    return (
      <div>
        <p>{this.props.itemText}</p>
        <button value={this.props.itemIndex} onClick={this.props.handleRemoveItem}>
          Remove
        </button>
      </div>
    );
  }
}

class Items extends React.Component<ItemStateFunc> {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          <Item key={index} itemText={item} itemIndex={index} handleRemoveItem={this.props.handleRemoveItem} />
        ))}
      </div>
    );
  }
}

export default class HomePage extends React.Component<{}, ItemState> {
  constructor(props: ReactPropTypes) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.state = {
      items: []
    };
  }
  handleRemoveItem(e: SyntheticEvent) {
    e.preventDefault();
    let newSet: string[] = [];
    newSet = this.state.items.filter((value: string, index: number) => {
        return (index as number) !== parseInt(e.currentTarget.getAttribute("value") as string);
      });

      this.setState(state => {
        return { items: newSet };
      });

  }
  handleRemoveAll(e: SyntheticEvent) {
    e.preventDefault();
    this.setState(state => {
      return { items: [] };
    });
  }
  handleAddItem(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      newItem: { value: string };
    };
    const newItem = target.newItem.value.trim(); // typechecks!

    target.newItem.value = "";

    if (!newItem) {
      return alert("Please provide an item");
    }

    this.setState(state => {
      return { items: state.items.concat(newItem) };
    });
  }
  render = () => {
    return (
      <div>
        <h1>Todo List</h1>
        <div>
          {/* <Items items={this.state.items} /> */}
          <Items items={this.state.items} handleRemoveItem={this.handleRemoveItem} />
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
