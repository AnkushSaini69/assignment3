import React from "react";

function Player({ x, y }) {
  return (
    <div
      className="player"
      style={{
        left: x,
        top: y,
      }}
    ></div>
  );
}

export default Player;
