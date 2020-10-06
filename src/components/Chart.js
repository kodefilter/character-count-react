import React from 'react'
import { Bar } from 'react-chartjs-2'

const Chart = ({ chartData }) => {
  return (
    <div className="chart">
      <Bar
        data={chartData}
        options={{
          title: {
            display: true,
            fontSize: 25,
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
  )
}

export default Chart
