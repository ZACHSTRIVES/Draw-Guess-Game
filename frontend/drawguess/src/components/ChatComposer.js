import React, { Component } from "react";

// we are using class componen coz we need temp state here
export default class ChatComposer extends Component {
  // temp state to only store new single message
  state = {
    new: ""
  };

  // if form was submitted, notify parent component
  handleSubmit = event => {
    event.preventDefault();
    // send event value to parent component via calling props
    this.props.submitted(this.state.new);
    // remove single message stored in this component state
    // and empty input coz form was submitted
    this.setState({
      new: ""
    });
  };

  // on input check if its not empty and store single message
  // in this component state
  handleCompose = event => {
    let typedValue = event.target.value;
    if (typedValue !== "" && typedValue !== " ") {
      // store new single message temporarily
      this.setState({
        new: event.target.value
      });
    }
  };

  render() {
    return (
      // dont use event => handle event below
      // binding won't work here
      <div className="chat-composer">
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            placeholder="Type & hit enter"
            onChange={this.handleCompose}
            value={this.state.new}
          />
        </form>
      </div>
    );
  }
}
