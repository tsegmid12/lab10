import React, { useState } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';

const quizCore = new QuizCore(); // Quiz логик менежерийг нэг удаа үүсгэнэ

const Quiz: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [_, forceUpdate] = useState({}); // Trick to force re-render

  const currentQuestion: QuizQuestion | null = quizCore.getCurrentQuestion();

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
    quizCore.answerQuestion(option);
  };

  const handleButtonClick = (): void => {
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setSelectedAnswer(null);
      forceUpdate({}); // Force re-render for next question
    } else {
      setIsQuizFinished(true);
    }
  };

  if (isQuizFinished || !currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul className="option-list">
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={`option-item ${selectedAnswer === option ? 'selected' : ''}`}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit Quiz'}
      </button>
    </div>
  );
};

export default Quiz;