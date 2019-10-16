import { SyntheticEvent } from "react";

export interface ItemState {
  items: {
    task: string;
    completed: boolean;
  }[];
  modalIsOpen: boolean;
  warningMessage: string;
  progress: number;
}

export interface ItemStateFunc {
  items: {
    task: string;
    completed: boolean;
  }[];
  handleRemoveItem(e: SyntheticEvent): void;
  handleCompletedToggle(e: SyntheticEvent): void;
}
