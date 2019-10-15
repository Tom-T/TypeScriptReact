import React, { ReactPropTypes, SyntheticEvent } from "react";

interface ItemState {
  items: {
    task: string;
    completed: boolean;
  }[];
}

interface ItemStateFunc extends ItemState {
  handleRemoveItem(e: SyntheticEvent): void;
  handleCompletedToggle(e: SyntheticEvent): void;
}

class Item extends React.Component<{
  handleRemoveItem(e: SyntheticEvent): void;
  handleCompletedToggle(e: SyntheticEvent): void;
  itemText: string;
  itemCompleted: boolean;
  itemIndex: number;
}> {
  render() {
    return (
      <div>
        <p
          style={{textDecoration:!this.props.itemCompleted? "none" :  "line-through"}}
        >
          {this.props.itemText}
        </p>
        <button value={this.props.itemIndex} onClick={this.props.handleRemoveItem}>
          {this.props.itemCompleted ? "Removed completed Task" : "Remove incomplete Task"}
        </button>

        <button value={this.props.itemIndex} onClick={this.props.handleCompletedToggle}>
          {this.props.itemCompleted ? "Mark Incomplete" : "Mark Completed"}
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
          <Item
            key={index}
            itemText={item.task}
            itemCompleted={item.completed}
            itemIndex={index}
            handleRemoveItem={this.props.handleRemoveItem}
            handleCompletedToggle={this.props.handleCompletedToggle}
          />
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
    this.handleCompletedToggle = this.handleCompletedToggle.bind(this);
    this.state = {
      items: []
    };
  }
  handleCompletedToggle(e: SyntheticEvent) {
    e.preventDefault();
    const thisIndex: number = parseInt(e.currentTarget.getAttribute("value") as string);

    this.setState(state => {
      let newState = this.state;
      newState.items[thisIndex].completed = !this.state.items[thisIndex].completed;
      return newState;
    });
  }
  handleRemoveItem(e: SyntheticEvent) {
    e.preventDefault();
    let newSet: { task: string; completed: boolean }[] = [];
    newSet = this.state.items.filter((value: { task: string; completed: boolean }, index: number) => {
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
      return { items: state.items.concat({ task: newItem, completed: false }) };
    });
  }
  render = () => {
    return (
      <div>
        <h1>Todo List</h1>
        <div>
          {/* <Items items={this.state.items} /> */}
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
