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

export default class HomePage extends React.Component<{}, ItemState> {
  constructor(props: ReactPropTypes) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleCompletedToggle = this.handleCompletedToggle.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    console.log("Loading Data");
    try {
      const savedData: ItemState = JSON.parse(localStorage.getItem("Mydata") as string);
      if (savedData) this.setState(Prevstate => savedData);
    } catch (e) {
      return;
    }
  }
  componentDidUpdate(prevState: ItemState) {
    console.log("Saving Data");
    const newData = JSON.stringify(this.state);
    if (JSON.stringify(prevState) !== newData) localStorage.setItem("Mydata", newData);
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

    this.setState(state => ({ items: newSet }));
  }
  handleRemoveAll(e: SyntheticEvent) {
    e.preventDefault();
    this.setState(state => ({ items: [] }));
  }
  handleAddItem(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      newItem: { value: string };
    };
    const newItem = target.newItem.value.trim(); // typechecks!

    target.newItem.value = "";

    if (!newItem) alert("Please provide an item");

    this.setState(state => ({ items: state.items.concat({ task: newItem, completed: false }) }));
  }
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
