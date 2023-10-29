import React, { Component } from 'react';
import QuizCore from '../core/QuizCore.ts';
import QuizQuestion from '../core/QuizQuestion';
import './Quiz.css'

/**
 * The `Quiz` component is a user interface for taking a quiz, displaying questions, answer options,
 * and tracking the user's score. It integrates with the `QuizCore` class to manage the quiz logic.
 */
interface QuizState {
  currentQuestion: QuizQuestion | null; // The current question being displayed.
  selectedAnswer: string | null; // The user's selected answer.
  score: number; // The user's score in the quiz.
}

class Quiz extends Component<{}, QuizState> {
  quizCore: QuizCore;

  /**
   * Creates an instance of the `Quiz` component, initializing it with the `QuizCore` for quiz management.
   * @constructor
   * @param props - The React component props.
   */
  constructor(props: {}) {
    super(props);
    this.quizCore = new QuizCore();
    this.state = {
      currentQuestion: this.quizCore.getCurrentQuestion(),
      selectedAnswer: null,
      score: 0,
    };
  }

  /**
   * Handles the user's selection of an answer option.
   * @param option - The selected answer option.
   */
  handleOptionSelect = (option: string) => {
    this.setState({ selectedAnswer: option });
  };

  /**
   * Handles the user's submission of an answer or moving to the next question.
   */
  handleButtonClick = () => {
    if (this.state.selectedAnswer !== null) {
      this.quizCore.answerQuestion(this.state.selectedAnswer);
      this.setState({ score: this.quizCore.getScore() });
    }

    this.quizCore.nextQuestion();
    this.setState({
      currentQuestion: this.quizCore.getCurrentQuestion(),
      selectedAnswer: null,
    });
  };

  /**
   * Renders the `Quiz` component with the current question and answer options or
   * displays the quiz completion status and score.
   */
  render() {
    const { currentQuestion, selectedAnswer, score } = this.state;
    const buttonText = this.quizCore.hasNextQuestion() ? 'Next Question' : 'Submit';

    if (currentQuestion) {
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

          <button onClick={this.handleButtonClick}>{buttonText}</button>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Quiz Completed!</h3>
          <p>Score: {score}</p>
        </div>
      );
    }
  }
}

export default Quiz;
