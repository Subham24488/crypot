
import React, { useState, useEffect } from 'react'
import BitGraph from './BitGraph'
import DatePicker from 'react-datepicker'
import Axios from '../axios'
import "react-datepicker/dist/react-datepicker.css"

const BitPrice = () => {

    //storing data in hooks
    const [price, setPrice] = useState()
    const [data, setData] = useState()

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    //calling the fetch-api function whenever component mounts
    useEffect(() => {
        handleFetchPriceData()
        return () => {
            setPrice()
            setData()
        }
    }, [])

    //fetching GET-Price API
    const handleFetchPriceData = () => {
        Axios.get('/currentprice.json')
        .then(response => {
            console.log(response.data.bpi);
            setPrice(response.data.bpi)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    //setting the selected Currency whenever a new currency is selected
    const handleSelectedData = (event) => {
        console.log(event.target.value);
        setData(price[event.target.value])
        
    }

    //selecting dates whenever the dates are changed
    const onChangeDate = dates => {
      const [start, end] = dates;
  
      setStartDate(start);
      setEndDate(end);
    };

   
    return (
    <div className="container">

        {/* currency-dropdown section */}

        {/* default is being set to USD surrency */}

        <div className="left-container">
        <p>1 Bitcoin Equals</p>
            <label for="cars">Choose a currency:</label>
            <select className="currency-selection" name="price" id="price" onChange={handleSelectedData}>
            {
                price && Object.values(price).map((item, key) => {
                    return(
                        <option value={item.code} key={key}>{item.description}</option>

                    )
                })
            }
            </select>
            <h1>{data ? `${data ?.rate} ${data ?. description}` : `${price && `${price['USD'].rate} ${price['USD'].description}`}` }</h1>
            <hr/>
            {/* date-selection section */}

            {/* react-datepicker package is being used for better/easier expience */}

            <div className="left-container-bottom">
            {/* small description */}
          <p>Please note that there is one day delay as <span style={{color:"greenyellow"}}>str.toISOString()</span> reduces the day by one.</p>
          <h4>Please select the startDate and the range.</h4>
          <h4>(Bydefault startDate=2020-02-01 and endDate=2021-03-25)</h4>

            {/* using date picker for selection of date */}
            <DatePicker
                dateFormat="yyyy/MM/dd"
                maxDate={new Date()}
                selected={startDate}
                onChange={onChangeDate}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
            />
            </div>
        </div>

        {/* graph section */}

        <div className="right-container">
             <BitGraph currency={data ?.code} startDate={startDate && startDate} endDate={endDate && endDate}/>
        </div>
    </div>
    )
}

export default BitPrice
