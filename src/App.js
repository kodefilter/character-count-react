import React, { useState } from 'react'
import './App.css'

function App() {
  const [chartData, setChartData] = useState(null)
  const [inputText, setInputText] = useState('')

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
