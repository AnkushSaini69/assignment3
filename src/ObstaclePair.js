import React from "react";

function ObstaclePair({ x, gapY, gapHeight }) {
  const obstacleWidth = 60;

  return (
    <>
      {/* Top Pipe */}
      <div
        className="obstacle top"
        style={{
          left: x,
          height: gapY,
          width: obstacleWidth,
        }}
      ></div>

      {/* Bottom Pipe */}
      <div
        className="obstacle bottom"
        style={{
          left: x,
          top: gapY + gapHeight,
          height: 600 - (gapY + gapHeight),
          width: obstacleWidth,
        }}
      ></div>
    </>
  );
}

export default ObstaclePair;
