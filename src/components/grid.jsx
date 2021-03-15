import React, { Component } from "react";
import Card from "./card";
class Grid extends Component {
  constructor(props) {
    super(props);
    const size = props.size;
    this.state = {
      grid: Array(size * size)
        .fill(null)
        .map((_, id) => {
          return { id: id, colour: 0, neighbour: 0 };
        }),
      running: false,
      speed: 500,
    };
  }
  timer = null;
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  getNeighbours = (gridID) => {
    return [
      gridID - this.props.size - 1,
      gridID - this.props.size,
      gridID - this.props.size + 1,
      gridID - 1,
      gridID + 1,
      gridID + this.props.size - 1,
      gridID + this.props.size,
      gridID + this.props.size + 1,
    ].map((index) => {
      return this.formatArrayIndexs(index);
    });
  };
  changeState = (gridID) => {
    var grid = [...this.state.grid];

    console.log(gridID);
    [
      gridID % this.props.size === 0 ? -1 : gridID - this.props.size - 1,
      gridID - this.props.size,
      gridID % this.props.size === this.props.size - 1
        ? -1
        : gridID - this.props.size + 1,
      gridID % this.props.size === 0 ? -1 : gridID - 1,
      gridID % this.props.size === this.props.size - 1 ? -1 : gridID + 1,
      gridID % this.props.size === 0 ? -1 : gridID + this.props.size - 1,
      gridID + this.props.size,
      gridID % this.props.size === this.props.size - 1
        ? -1
        : gridID + this.props.size + 1,
    ]
      .map((index) => {
        return this.formatArrayIndexs(index);
      })
      .forEach((index) => {
        console.log(index);
        if (index || index === 0)
          grid[index] = {
            ...grid[index],
            neighbour: grid[index].neighbour + (grid[gridID].colour ? -1 : 1),
          };
      });
    grid[gridID] = { ...grid[gridID], colour: grid[gridID].colour ? 0 : 1 };
    this.setState({ grid });
  };
  renderGameFrame = () => {
    let grid = [...this.state.grid];
    grid
      .filter(({ colour, neighbour }) => {
        return (
          (colour === 1 && (neighbour < 2 || neighbour > 3)) ||
          (colour === 0 && neighbour === 3)
        );
      })
      .forEach(({ id, neighbour, colour }) => {
        console.log(id, neighbour, colour);
        const neighbourIndexs = [
          id % this.props.size === 0 ? -1 : id - this.props.size - 1,
          id - this.props.size,
          id % this.props.size === this.props.size - 1
            ? -1
            : id - this.props.size + 1,
          id % this.props.size === 0 ? -1 : id - 1,
          id % this.props.size === this.props.size - 1 ? -1 : id + 1,
          id % this.props.size === 0 ? -1 : id + this.props.size - 1,
          id + this.props.size,
          id % this.props.size === this.props.size - 1
            ? -1
            : id + this.props.size + 1,
        ].map((index) => {
          return this.formatArrayIndexs(index);
        });
        neighbourIndexs.forEach((index, i) => {
          if (index || index === 0) {
            console.log(
              {
                ...grid[index],
                neighbour: grid[index].neighbour + (grid[id].colour ? -1 : 1),
              },
              i
            );
            grid[index] = {
              ...grid[index],
              neighbour: grid[index].neighbour + (grid[id].colour ? -1 : 1),
            };
          }
        });
        grid[id] = { ...grid[id], colour: grid[id].colour ? 0 : 1 };
      });
    console.log(grid);
    this.setState({ grid });
  };
  runGame = () => {
    this.timer = setInterval(() => this.renderGameFrame, this.state.speed);
  };
  killGame = () => {
    clearInterval(this.timer);
  };
  formatArrayIndexs = (index) => {
    return index < 0 || index >= this.props.size * this.props.size
      ? null
      : index;
  };
  render() {
    return (
      <React.Fragment>
        <div className="grid-box">
          {this.state.grid.map((card, id) => {
            return <Card onClick={this.changeState} key={id} item={card} />;
          })}
        </div>
        <button onClick={this.renderGameFrame}>Render Frame</button>
      </React.Fragment>
    );
  }
}

export default Grid;
