import React, { useEffect, useRef, useState } from "react";

const characterImg = "https://i.ibb.co/3FbzF1Z/runner.png";

export default function JumpGameEnhanced() {
  const characterRef = useRef(null);
  const obstacleRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem("jump-high")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [obstacleSpeed, setObstacleSpeed] = useState(2);
  const [obstacleKey, setObstacleKey] = useState(0);

  const jump = () => {
    if (!gameStarted || isJumping || gameOver) return;

    const char = characterRef.current;
    char.classList.remove("jump");
    void char.offsetWidth;
    char.classList.add("jump");
    setIsJumping(true);

    setTimeout(() => setIsJumping(false), 500);
  };

  const playSound = () => {
    const audio = new Audio("https://www.myinstants.com/media/sounds/wrong-answer-sound-effect.mp3");
    audio.volume = 0.4;
    audio.play();
  };

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(200);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      const character = characterRef.current;
      const obstacle = obstacleRef.current;

      if (!character || !obstacle) return;

      const charTop = parseInt(getComputedStyle(character).getPropertyValue("top"));
      const obsLeft = parseInt(getComputedStyle(obstacle).getPropertyValue("left"));

      if (obsLeft < 70 && obsLeft > 30 && charTop >= 130) {
        setGameOver(true);
        playSound();
        vibrate();
        if (score > highScore) {
          localStorage.setItem("jump-high", score.toString());
          setHighScore(score);
        }
      } else {
        setScore((s) => {
          const newScore = s + 1;
          if (newScore % 100 === 0) {
            setObstacleSpeed((spd) => Math.max(spd - 0.2, 0.8));
            setObstacleKey((k) => k + 1);
          }
          return newScore;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [score, gameOver, gameStarted]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setObstacleSpeed(2);
    setObstacleKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-sky-300 to-green-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-indigo-800 mb-4">Jump Hero 🏃‍♂️</h1>

      <div className="flex gap-6 mb-4 text-lg">
        <div className="bg-white px-5 py-2 rounded shadow font-semibold">Score: {score}</div>
        <div className="bg-white px-5 py-2 rounded shadow font-semibold">High: {highScore}</div>
      </div>

      <div
        className="relative w-full max-w-md h-[520px] bg-gradient-to-b from-sky-100 to-green-400 border border-black rounded-xl shadow-lg overflow-hidden cursor-pointer"
        onClick={jump}
      >
      
        <div className="absolute bottom-0 w-full h-[40px] bg-green-800"></div>

        
        <img
          ref={characterRef}
          src={characterImg}
          alt="runner"
          className="absolute left-[40px] top-[130px] w-[40px] h-[40px] object-contain z-10"
        />

       
        {!gameOver && gameStarted && (
          <div
            ref={obstacleRef}
            key={obstacleKey}
            className="absolute top-[130px] left-[320px] w-[40px] h-[40px] bg-red-600 rounded-md shadow-md"
            style={{
              animation: `obstacle-move ${obstacleSpeed}s linear infinite`,
            }}
          ></div>
        )}

        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
            <p className="text-lg font-medium mb-2">Tap to Start</p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Start Game
            </button>
          </div>
        )}
      </div>

      {gameOver && (
        <div className="mt-6 text-center">
          <p className="text-lg font-bold text-red-600">💥 Game Over</p>
          <button
            onClick={startGame}
            className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Play Again
          </button>
        </div>
      )}

      <p className="text-sm text-gray-700 mt-4">Click or tap anywhere in the game to jump</p>

      {/* Styles */}
      <style>
        {`
          @keyframes obstacle-move {
            0% { left: 100%; }
            100% { left: -40px; }
          }

          @keyframes jump {
            0% { top: 130px; }
            50% { top: 50px; }
            100% { top: 130px; }
          }

          .jump {
            animation: jump 0.5s ease;
          }
        `}
      </style>
    </div>
  );
}
