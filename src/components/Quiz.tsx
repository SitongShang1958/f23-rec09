import React, { Component } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';

interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
}

class Quiz extends Component<{}, QuizState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      questions: [
        {
          question: 'What is the capital of France?',
          options: ['London', 'Berlin', 'Paris', 'Madrid'],
          correctAnswer: 'Paris',
        },
      ],
      currentQuestionIndex: 0, // Initialize the current question index.
      selectedAnswer: null, // Initialize the selected answer.
      score: 0, // Initialize the score.
    };
  }

  handleOptionSelect = (option: string): void => {
    this.setState({ selectedAnswer: option })
  }


  handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
  } 

  render (): React.ReactNode {
    const { questions, currentQuestionIndex, selectedAnswer, score } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
      return (
        // Display the quiz completion message and final score when all questions have been answered.
        <div>
          <h2>Quiz Completed</h2>
          <p>Final Score: {score} out of {questions.length}</p>
        </div>
      );
    }

    return (
      <div>
        <h2>Quiz Question:</h2>
        <p>{currentQuestion.question}</p>

        <h3>Answer Options:</h3>
        <ul>
          {currentQuestion.options.map((option) => (
            <li
              key={option}
              onClick={() => this.handleOptionSelect(option)}
              className={selectedAnswer === option ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>

        <h3>Selected Answer:</h3>
        <p>{selectedAnswer ?? 'No answer selected'}</p>

        <button onClick={this.handleButtonClick}>Next Question</button>
      </div>
    )
  }
}

export default Quiz
