import React, { Component } from "react";
import Grid from "./grid";

class App extends Component {
  state = { size: 10 };
  constructor() {
    super();
    document.documentElement.style.setProperty("--size", this.state.size);
  }
  changeSize = () => {
    const size = parseInt(document.getElementById("size-box").value);
    document.documentElement.style.setProperty("--size", size);
    this.setState({ size });
  };
  render() {
    return (
      <React.Fragment>
        <input type="text" id="size-box" />
        <button onClick={this.changeSize}>Change size</button>
        <Grid key={this.state.size} size={this.state.size} />
      </React.Fragment>
    );
  }
}

export default App;
