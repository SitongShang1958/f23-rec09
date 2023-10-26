interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

const quizData: QuizQuestion[] = [
  {
    question: 'Which of the following describes a group of objects that are treated the same way as a single instance of the same type of object?',
    options: ['Composite', 'Strategy', 'Template method'],
    correctAnswer: 'Composite'
  }
]

export default quizData
