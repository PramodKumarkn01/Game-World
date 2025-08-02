import React, { useState } from 'react';

export default function DiamondFinder() {
  const [boxes, setBoxes] = useState(generateBoxes());
  const [message, setMessage] = useState('Find the Diamond 💎');

  function generateBoxes() {
    const diamondBox = Math.floor(Math.random() * 16);
    return Array.from({ length: 16 }, (_, idx) => ({
      hasDiamond: idx === diamondBox,
      opened: false,
    }));
  }

  function openBox(index) {
    if (boxes[index].opened) return;

    const newBoxes = boxes.map((box, idx) =>
      idx === index ? { ...box, opened: true } : box
    );
    setBoxes(newBoxes);

    if (newBoxes[index].hasDiamond) {
      setMessage('🎉 You Found the Diamond!');
    } else {
      setMessage('😟 Try Again!');
    }
  }

  function resetGame() {
    setBoxes(generateBoxes());
    setMessage('Find the Diamond 💎');
  }

  return (
    <div className="min-h-screen min-w-screen bg-green-300 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{message}</h1>

      <div className="grid grid-cols-4 gap-4 bg-red-300 p-10 rounded-xl">
        {boxes.map((box, index) => (
          <button
            key={index}
            onClick={() => openBox(index)}
            className={`w-20 h-20 text-2xl font-bold rounded-md shadow-md border border-red-500 flex items-center justify-center transition-colors duration-300
              ${box.opened 
                ? box.hasDiamond 
                  ? 'bg-red-200' 
                  : 'bg-green-300' 
                : 'bg-indigo-500 text-white'}`}
          >
            {box.opened ? (box.hasDiamond ? '💎' : '😟') : '?'}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-blue-900 text-indigo-500 rounded-md shadow-md hover:bg-blue-800"
      >
        Reset Game
      </button>
    </div>
  );
}
