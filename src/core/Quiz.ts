import fs from 'fs';
import csv from 'csv-parser';
import QuizQuestion from './QuizQuestion';

class Quiz {
  private questions: QuizQuestion[];
  private currentQuestionIndex: number;
  private score: number;

  /**
   * Constructor
   * @param filePath - The file path to a CSV file containing quiz data.
   * @param callback - A callback function called when the quiz data is loaded.
   */
  constructor(filePath: string, callback: (quiz: Quiz) => void) {
    // Initializes the quiz by loading data from the provided CSV file.
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;

    this.loadQuizData(filePath, () => {
      callback(this);
    });
  }

  /**
   * Get the current question.
   * @returns The current question or null if no questions are available.
   */
  public getCurrentQuestion(): QuizQuestion | null {
    // Returns the current quiz question.
    if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  /**
   * Move to the next question.
   */
  public nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  /**
   * Record the user's answer and update the score.
   * @param answer - The user's answer.
   */
  public answerQuestion(answer: string): void {
    // Records the user's answer and updates the score if the answer is correct.
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      this.score++;
    }
  }

  /**
   * Get the user's score.
   * @returns The user's score.
   */
  public getScore(): number {
    return this.score;
  }

  private loadQuizData(filePath: string, callback: () => void): void {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const quizQuestion: QuizQuestion = {
          question: row.question,
          options: row.options.split(','),
          correctAnswer: row.correctAnswer,
        };
        this.questions.push(quizQuestion);
      })
      .on('end', () => {
        console.log('Quiz data loaded.');
        callback();
      });
  }
}

export default Quiz;
