import React, { Component } from 'react';


class Modal extends Component {
  constructor() {
    super();

    this.state = { open: false };
    this.close = this.close.bind(this);
  }

  open(rc) {
    return this.setState({ open: true });
  }

  close() {
    return this.setState({ open: false });
  }

  render() {
    return this.state.open ? (
      <div className="overlay">
        <div className="modal">
          <button onClick={this.close} className="modal__close">&times;</button>
          <div>{this.props.children}</div>
        </div>
      </div>
    ) : false;
  }
}

Modal.propTypes = {
  children: React.PropTypes.element,
};

export default Modal;
