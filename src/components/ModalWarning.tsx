import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "18%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%"
  }
};

export default class ModalWarning extends React.Component<{ warningMessage: string; clearWarning(): void }> {
  props: { warningMessage: string; clearWarning(): void } = {
    warningMessage: "",
    clearWarning: () => {}
  };
  closeModal = () => {
    this.props.clearWarning();
  };

  render = () => (
    <Modal
      isOpen={this.props.warningMessage ? true : false}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Warning:"
    >
      <p>{this.props.warningMessage}</p>
      <button onClick={this.closeModal}>Okay</button>
    </Modal>
  );
}
