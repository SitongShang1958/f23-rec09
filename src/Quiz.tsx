import React, { Component } from 'react'
import './Quiz.css'

interface QuizState {
  question: string
  options: string[]
  selectedAnswer: string | null
}

class Quiz extends Component<{}, QuizState> {
  constructor (props: {}) {
    super(props)
    this.state = {
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      selectedAnswer: null
    }
  }

  handleOptionSelect = (option: string): void => {
    this.setState({ selectedAnswer: option })
  }

  // Task 1: Load quiz data from quizData.ts and set it in the component state
  loadQuizData = (): void => {
    // Fetch quiz data from quizData.ts and update the state
    // Hint: You can use this.setState() to update the question and options
  }

  // Task 3: Manage User Interaction and Scoring
  handleRecordUserChoice = (): void => {
    // Implement code to record the user's choice and update the score
    // Hint: Compare the selected answer with the correct answer and update the score
  }

  componentDidMount (): void {
    // Load quiz data when the component mounts (Task 1)
    this.loadQuizData()
  }

  render (): React.ReactNode {
    const { question, options, selectedAnswer } = this.state

    return (
      <div>
        <h2>Quiz Question:</h2>
        <p>{question}</p>

        <h3>Answer Options:</h3>
        <ul>
          {options.map((option) => (
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

        <button onClick={this.handleRecordUserChoice}>Submit</button> {/* Add this button */}
        <p>Score: {/* add the score value to show correct/wrong */}</p>
      </div>
    )
  }
}

export default Quiz
