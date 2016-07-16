import React, { Component } from 'react';


class Modal extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };
  }

  open(rc) {
    return this.setState({ open: true });
  }

  render() {
    return this.state.open ? (
      <div className="overlay">
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    ) : false;
  }
}

Modal.propTypes = {
  children: React.PropTypes.element,
};

export default Modal;
