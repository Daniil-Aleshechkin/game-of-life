import React, { Component } from 'react';

const Card = ({ colour, id, onClick }) => {
    var formatColour = (c) => {
        return ((c == 0) ? "red" : "blue")
    }
    return (<div onClick={() => onClick(id)} key={id} className={"grid-item " + formatColour(colour)}></div>);
}

export default Card;