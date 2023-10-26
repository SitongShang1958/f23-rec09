import React, { Component } from 'react';
import Quiz from './Quiz';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>My React Quiz</h1>
        <Quiz />
      </div>
    );
  }
}

export default App;
