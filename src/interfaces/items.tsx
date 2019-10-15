import { SyntheticEvent } from "react";

export interface ItemState {
  items: {
    task: string;
    completed: boolean;
  }[];
}

export interface ItemStateFunc extends ItemState {
  handleRemoveItem(e: SyntheticEvent): void;
  handleCompletedToggle(e: SyntheticEvent): void;
}
