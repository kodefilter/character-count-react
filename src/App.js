import React, { useState, createRef } from 'react'
import './App.css'
import Chart from './components/Chart'



function App() {
  const [chartData, setChartData] = useState(null)
  const fileInput = createRef()


  const handleSubmit = (event) => {
    event.preventDefault()

    let file = fileInput.current.files[0]

    let reader = new FileReader()

    reader.readAsText(file)

    reader.onload = function() {
      let chardata = createChartData(reader.result)
      setChartData(chardata)
    }

    reader.onerror = function(){
      console.log(reader.error)
    }

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
    const labels = result.map(element => Object.keys(element)[0])

    const data = result.map(element => Object.values(element)[0])

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

      <form onSubmit={handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
        
      {chartData === null ? (
        <h1>
          Input text above{' '}
          <span role="img" aria-label="point up emoji">
            👆🏼{' '}
          </span>
          and click RUN{' '}
          <span role="img" aria-label="point right emoji">
            👉🏼{' '}
          </span>
        </h1>
      ) : (
        <Chart chartData={chartData} />
      )}
    </div>
  )
}

export default App
