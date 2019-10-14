import React, { ReactPropTypes, SyntheticEvent } from "react";

class Items extends React.Component {
  render = () => {
    return (
      <Item></Item>
    );
  };
}
class Item extends React.Component {
  render = () => {
    return (
      <div>
        <p>Main page</p>
      </div>
    );
  };
}
class AddItem extends React.Component {
  constructor(props: ReactPropTypes) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.state = {
      items: []
    };
  }

  handleAddItem(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      newItem: { value: string };
    };
    const newItem = target.newItem.value; // typechecks!

    if (newItem) {
      alert(newItem);
    }
  }
  render = () => {
    return (
      <div>
        <form onSubmit={this.handleAddItem}>
          <input type="text" name="newItem" />
          <button>Add Item</button>
        </form>
      </div>
    );
  };
}

interface NoteState {
  notes: [];
}

export default class HomePage extends React.Component<{}, NoteState> {
  // constructor(props: ReactPropTypes) {
  //   super(props);
  //   this.addNote = this.addNote.bind(this);
  //   this.state = {
  //     notes: []
  //   };
  // }
  // // addNote() {
  // //   // this.setState((state, props<ReactPropTypes> ) => {
  // //   this.setState((state, props) => {
  // //     return { notes: [...state.notes, props.notes] };
  // //   });
  // // }
  render = () => {
    return (
      <div>
        <h1>Todo List</h1>
        <Items />
        <AddItem />
      </div>
    );
  };
}
