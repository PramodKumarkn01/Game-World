import React, { useState, useEffect, useRef } from 'react';

const animalEmojis = ['🐶', '🐱', '🦁', '🐯', '🐸', '🐵', '🐧', '🐰'];

const shuffleArray = (arr) => {
  const duplicated = [...arr, ...arr];
  for (let i = duplicated.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [duplicated[i], duplicated[j]] = [duplicated[j], duplicated[i]];
  }
  return duplicated.map((emoji, index) => ({
    id: index,
    emoji,
    revealed: false,
    matched: false,
  }));
};

export default function IQAnimalMatchGame() {
  const [grid, setGrid] = useState(shuffleArray(animalEmojis));
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [message, setMessage] = useState('🧠 Find the Matching Animals');
  const [flips, setFlips] = useState(0);
  const [time, setTime] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    return localStorage.getItem('iq-match-highscore') || null;
  });

  const timerRef = useRef(null);

  // Start timer
  useEffect(() => {
    if (!gameFinished) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [gameFinished]);

  const handleClick = (box) => {
    if (box.matched || box.revealed || secondPick) return;

    const newGrid = [...grid];
    newGrid[box.id].revealed = true;
    setGrid(newGrid);
    setFlips((prev) => prev + 1);

    if (!firstPick) {
      setFirstPick(box);
    } else {
      setSecondPick(box);
    }
  };

  useEffect(() => {
    if (firstPick && secondPick) {
      const isMatch = firstPick.emoji === secondPick.emoji;

      setTimeout(() => {
        const newGrid = grid.map((box) => {
          if (box.id === firstPick.id || box.id === secondPick.id) {
            return {
              ...box,
              revealed: isMatch,
              matched: isMatch,
            };
          }
          return box;
        });

        setGrid(newGrid);
        setMessage(isMatch ? '✅ Match Found!' : '❌ Try Again');
        setFirstPick(null);
        setSecondPick(null);
      }, 600);
    }
  }, [firstPick, secondPick]);

  useEffect(() => {
    const allMatched = grid.every((box) => box.matched);
    if (allMatched) {
      clearInterval(timerRef.current);
      setMessage('🎉 You Matched All Pairs!');
      setGameFinished(true);

      // Save high score
      const existing = parseInt(localStorage.getItem('iq-match-highscore'), 10);
      if (!existing || time < existing) {
        localStorage.setItem('iq-match-highscore', time.toString());
        setHighScore(time);
      }
    }
  }, [grid]);

  const resetGame = () => {
    setGrid(shuffleArray(animalEmojis));
    setFirstPick(null);
    setSecondPick(null);
    setMessage('🧠 Find the Matching Animals');
    setFlips(0);
    setTime(0);
    setGameFinished(false);
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-green-300 px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">{message}</h1>

      <div className="flex justify-between gap-8 mb-4 flex-wrap text-center">
        <div className="bg-white px-4 py-2 rounded shadow font-medium text-black">🕒 Time: {time}s</div>
        <div className="bg-white px-4 py-2 rounded shadow font-medium text-black">🔁 Flips: {flips}</div>
        <div className="bg-white px-4 py-2 rounded shadow font-medium text-black">🏆 High Score: {highScore ? `${highScore}s` : '—'}</div>
      </div>

      <div className="grid grid-cols-4 gap-4 bg-red-300 p-10 rounded-xl">
        {grid.map((box) => (
          <button
            key={box.id}
            onClick={() => handleClick(box)}
            className="w-20 h-20 text-2xl font-bold rounded-md shadow-md border border-indigo-600 bg-blue-900 text-white hover:bg-indigo-700"
          >
            {box.revealed || box.matched ? box.emoji : '?'}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 text-indigo-500 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Restart Game
      </button>
    </div>
  );
}
