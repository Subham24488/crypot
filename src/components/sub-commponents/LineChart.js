import React from 'react'
import {Line} from 'react-chartjs-2'

const LineChart = ({data}) => {

    //using react-chartjs-2 for displaying the charts

    //setting-up the dataset and the options
    const data_ = {
        labels: data && Object.keys(data),     //Y-axis of the chart
        datasets: [
          {
            label: '# dates',
            data: data && Object.values(data), //X-axis of the chart
            fill: true,
            backgroundColor: '#0f3fa062',
            borderColor: '#0f3fa062',
          },
        ],
      }
      
      const options_ = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }

    return (
        <div>
         <Line data={data_} options={options_}/>   
        </div>
    )
}

export default LineChart
