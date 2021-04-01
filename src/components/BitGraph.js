import React,{useEffect, useState} from 'react'
import LineChart from './sub-commponents/LineChart'
import Axios from '../axios'

const BitGraph = ({currency, startDate, endDate}) => {
    
    // converting dates to ISOString format for passing it into the respective API
    // start-date conversion
    let start = startDate && startDate.toISOString().slice(0, 10)
    // end-date conversion
    let end = endDate && endDate.toISOString().slice(0, 10)

    //setting currency default value
    const [data, setData] = useState()

    // calling the fetch-API function when currency, startDate, endDate changes
    useEffect(() => {
        handleFetchGraphData()
        return () => {
           
            setData()
        }
    }, [currency, startDate, endDate])

    //fetching GET-graph API according to the currency and dates selected
    const handleFetchGraphData = () => {
        Axios.get(`/historical/close.json?currency=${currency ? currency : "USD"}&start=${start ? start : '2020-02-01'}&end=${end ? end : '2021-04-01'}`)
        .then(response => {
            setData(response.data ?. bpi) 
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
           <LineChart data={data}/>
        </div>
    )
}

export default BitGraph
