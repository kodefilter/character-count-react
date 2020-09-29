import React, { useState } from 'react'
import './App.css'

function App() {
  const [chartData, setChartData] = useState(null)
  const [inputText, setInputText] = useState('')

  const handleInputTextChange = event => {
    setInputText(event.target.value)
  }

  const createChartData = text => {
    //removing non alphabetic characters
    const cleanString = text.toLowerCase().replace(/[^A-Za-z]/g, '')

    const arrayOfArrays = Object.entries(
      [...cleanString].reduce((obj, item) => {
        if (item in obj) {
          obj[item]++
        } else {
          obj[item] = 1
        }
        return obj
      }, {}),
    )

    // map array of arrays to array of objects
    const arrayOfObjects = arrayOfArrays.map(function ([a, b]) {
      return { [a]: b }
    })

    // sort array of objects alphabetically
    const result = arrayOfObjects.sort(function (a, b) {
      if (Object.keys(a)[0] > Object.keys(b)[0]) return 1
      return -1
    })

    // format result to create chartData
    const labels = result.characterCount.map(element => Object.keys(element)[0])

    const data = result.characterCount.map(element => Object.values(element)[0])

    return {
      labels: labels,
      datasets: [
        {
          label: 'Character Count',
          data: data,
          backgroundColor: dynamicColors(data),
        },
      ],
    }
  }

  const dynamicColors = data => {
    const backgroundColorArray = data.map(element => {
      var r = Math.floor(Math.random() * 255)
      var g = Math.floor(Math.random() * 255)
      var b = Math.floor(Math.random() * 255)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    })
    return backgroundColorArray
  }

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
