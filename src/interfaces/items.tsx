import { SyntheticEvent } from "react";

export interface ItemState {
  items: {
    task: string;
    completed: boolean;
  }[];
  modalIsOpen: boolean;
  warningMessage: string;
}

export interface ItemStateFunc {
  items: {
    task: string;
    completed: boolean;
  }[];
  handleRemoveItem(e: SyntheticEvent): void;
  handleCompletedToggle(e: SyntheticEvent): void;
}
