import React from "react";

const Card = ({ colour, item, onClick }) => {
  var formatColour = (c) => {
    return c === 0 ? "red" : "blue";
  };
  return (
    <div
      onClick={() => onClick(item.id)}
      key={item.id}
      className={"grid-item " + formatColour(item.colour)}
    ></div>
  );
};

export default Card;
