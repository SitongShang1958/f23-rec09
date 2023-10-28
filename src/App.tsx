import React, { Component } from 'react'
import Quiz from './components/Quiz.tsx'

class App extends Component {
  render (): React.ReactNode {
    return (
      <div className='App'>
        <h1>My React Quiz</h1>
        <Quiz />
      </div>
    )
  }
}

export default App
