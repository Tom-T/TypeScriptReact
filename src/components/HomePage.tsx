import React, { ReactPropTypes, SyntheticEvent } from "react";

interface ItemState {
  items: string[];
}

class Item extends React.Component<{ itemText: string }> {
  render() {
    return <div>{this.props.itemText}</div>;
  }
}

class Items extends React.Component<ItemState> {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          <Item key={index} itemText={item} />
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
    this.setState(state => {
      return { items: [] };
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
      console.log("items: " + state.items);
      return { items: state.items.concat(newItem) };
    });
  }
  render = () => {
    return (
      <div>
        <h1>Todo List</h1>
        <div>
          <Items items={this.state.items} />
          {/* <Items items={this.state.items} handleRemoveItem={this.handleRemoveItem} /> */}
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
