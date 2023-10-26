import React, { Component } from 'react';
import quizData from './data/quizData.ts';
import './Quiz.css';

interface QuizProps {}

interface QuizState {
    question: string;
    options: string[];
    selectedAnswer: string | null;
    feedback: string; // task3
}

class Quiz extends Component<QuizProps, QuizState> {
    constructor(props: QuizProps) {
        super(props);
        this.state = {
            question: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            selectedAnswer: null,
            feedback: 'not submitted yet', //task3
        };
    }

    handleOptionSelect = (option: string) => {
        this.setState({ selectedAnswer: option });
    }

    // Task 1
    loadQuizData = () => {
        // Load quiz data from quizData.ts and update the state
        const loadedData = quizData; // Use the imported quizData here
        // Extract the first question and options
        const firstQuestion = loadedData[0];
        this.setState({
            question: firstQuestion.question,
            options: firstQuestion.options,
        });
    }

    // Task 3: Manage User Interaction and Scoring
    recordUserChoice = () => {
        const { selectedAnswer, question } = this.state;
        const correctAnswer = quizData.find((q) => q.question === question)?.correctAnswer;
      
        if (selectedAnswer === correctAnswer) {
            // If the selected answer is correct, update the score
            this.setState({
                feedback: 'Correct'
            });
        } else {
            this.setState({
                feedback: 'Incorrect'
            });
        }
    }

    componentDidMount() {
        // Load quiz data when the component mounts (Task 1)
        this.loadQuizData();
    }


    render() {
        const { question, options, selectedAnswer, feedback } = this.state;

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
            <p>{selectedAnswer || 'No answer selected'}</p>

            <button onClick={this.recordUserChoice}>Submit</button> {/* Add this button */}
            <p>Feedback: {feedback}</p>
        </div>
        );
    }
}

export default Quiz;
