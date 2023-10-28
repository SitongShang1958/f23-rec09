import React, { Component } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';

interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
  submitted: boolean
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
      currentQuestionIndex: 0,
      selectedAnswer: null,
      score: 0,
      submitted: false
    };
  }

  handleOptionSelect = (option: string): void => {
    this.setState({ selectedAnswer: option })
  }

  // Task 1: Load quiz data from quizData.ts and set it in the component state
  loadQuizData = (): void => {
    // Fetch quiz data from quizData.ts and update the state
    // Hint: You can use this.setState() to update the question and options
  }

  handleSubmit = (): void => {
    this.setState({ submitted: true })
  }

  handleMoveNext = (): void => {
  }

  componentDidMount (): void {
    // Load quiz data when the component mounts (Task 1)
    this.loadQuizData()
  }

  render (): React.ReactNode {
    const { questions, currentQuestionIndex, selectedAnswer, score, submitted } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion || submitted) {
      // All questions have been answered
      return (
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

        <button onClick={this.handleMoveNext}>Next Question</button>
        <button onClick={this.handleSubmit}>Submit</button> {/* Add this button */}
      </div>
    )
  }
}

export default Quiz
