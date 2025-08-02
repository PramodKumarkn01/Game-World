import React, { useState } from 'react';

const questions = [
  {
    question: 'What comes next in the sequence: 2, 4, 8, 16, ?',
    options: ['18', '24', '32', '20'],
    answer: '32',
  },
  {
    question: 'If ALL BLOOPS are RAZZIES and ALL RAZZIES are LUPPIES, then ALL BLOOPS are definitely LUPPIES?',
    options: ['Yes', 'No', 'Cannot Determine', 'Maybe'],
    answer: 'Yes',
  },
  {
    question: 'Which shape does not belong?',
    options: ['Circle', 'Square', 'Triangle', 'Elephant'],
    answer: 'Elephant',
  },
  {
    question: 'What is the missing number? 1, 4, 9, 16, ?',
    options: ['25', '36', '20', '49'],
    answer: '25',
  },
];

export default function IQTestGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQ = questions[currentIndex];

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === currentQ.answer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen min-w-screen bg-green-300 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        {!showResult ? (
          <>
            <h2 className="text-3xl font-bold mb-4 text-indigo-500">IQ Test Question {currentIndex + 1}</h2>
            <p className="mb-4 text-black">{currentQ.question}</p>
            <div className="grid gap-3">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 rounded border 
                    ${
                      selected === option
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="mt-6 px-4 py-2 !bg-indigo-500 text-white rounded !hover:bg-indigo-700 disabled:opacity-50"
            >
              {currentIndex + 1 < questions.length ? 'Next' : 'Show Result'}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-black">🎉 Your Score: {score} / {questions.length}</h2>
            <button
              onClick={resetGame}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Restart Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}
