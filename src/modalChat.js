import React from "react";
import Modal from "./components/Modal";

class modalChat extends React.Component {
  state = {
    show: false
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    return (
      <div className="modalChat">
        <button
          class="toggle-button"
          id="centered-toggle-button"
          onClick={e => {
            this.showModal(e);
          }}
        >
          {" "}
          show Modal{" "}
        </button>

        <Modal onClose={this.showModal} show={this.state.show}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
          deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
          fuga omnis a sed impedit explicabo accusantium nihil doloremque
          consequuntur.
        </Modal>
      </div>
    );
  }
}

export default modalChat;