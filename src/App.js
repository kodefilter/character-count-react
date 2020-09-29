import React from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Analyze Text</h1>
      <form onSubmit={analyzeText} className="form">
        <textarea
          id="text"
          value={inputText}
          onChange={handleInputTextChange}
        ></textarea>
        <button type="submit">Run</button>
      </form>
    </div>
  )
}

export default App
