import React, { useEffect, useRef, useState } from "react";
import Player from "./Player";
import ObstaclePair from "./ObstaclePair";
import Score from "./Score";

function Game() {
  const gameWidth = 400;
  const gameHeight = 600;

  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(250);
  const [velocity, setVelocity] = useState(0);

  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);

  const gravity = 0.5;
  const jumpStrength = -9;
  const obstacleSpeed = 3;
  const gapHeight = 150;

  const gameRef = useRef(null);

  useEffect(() => {
    spawnObstacle();

    const interval = setInterval(() => {
      spawnObstacle();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const spawnObstacle = () => {
    const minGapY = 80;
    const maxGapY = gameHeight - 80 - gapHeight;
    const gapY = Math.floor(Math.random() * (maxGapY - minGapY)) + minGapY;

    setObstacles((prev) => [
      ...prev,
      { x: gameWidth, gapY: gapY, passed: false },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      setVelocity(jumpStrength);
    }
    if (e.code === "ArrowLeft") {
      setPlayerX((x) => Math.max(0, x - 20));
    }
    if (e.code === "ArrowRight") {
      setPlayerX((x) => Math.min(gameWidth - 30, x + 20));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let animationFrame;

    const update = () => {
      setVelocity((v) => v + gravity);
      setPlayerY((y) => {
        const newY = y + velocity;
        return Math.max(0, Math.min(newY, gameHeight - 30));
      });

      setObstacles((prev) =>
        prev
          .map((obs) => ({
            ...obs,
            x: obs.x - obstacleSpeed,
          }))
          .filter((obs) => obs.x > -60)
      );

      setObstacles((prev) =>
        prev.map((obs) => {
          if (!obs.passed && obs.x + 60 < playerX) {
            setScore((s) => s + 1);
            return { ...obs, passed: true };
          }
          return obs;
        })
      );

      checkCollision();

      animationFrame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrame);
  });

  const checkCollision = () => {
    for (let obs of obstacles) {
      const playerW = 30;
      const playerH = 30;

      if (
        playerX + playerW > obs.x &&
        playerX < obs.x + 60 &&
        (playerY < obs.gapY || playerY + playerH > obs.gapY + gapHeight)
      ) {
        window.location.reload();
      }
    }
  };

  return (
    <div
      className="game-box"
      ref={gameRef}
      style={{ width: gameWidth, height: gameHeight }}
    >
      <Player x={playerX} y={playerY} />
      {obstacles.map((obs, idx) => (
        <ObstaclePair key={idx} x={obs.x} gapY={obs.gapY} gapHeight={gapHeight} />
      ))}
      <Score score={score} />
    </div>
  );
}

export default Game;
