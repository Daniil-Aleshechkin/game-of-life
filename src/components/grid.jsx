import React, { Component } from 'react';
import Card from "./card"
class Grid extends Component {
    constructor() {
        super()
        this.state = { grid: Array(100).fill({ colour: 0 }) }
    }
    handleClick = (gridID) => {
        var grid = [...this.state.grid]
        grid[gridID] = { colour: (grid[gridID].colour) ? 0 : 1 }
        this.setState({ grid })
        console.log(grid)
    }
    render() {
        return (
            <div className="grid-box">{this.state.grid.map((card, id) => {
                return <Card onClick={this.handleClick} key={id} colour={card.colour} id={id} />
            })}</div>
        );
    }
}

export default Grid;