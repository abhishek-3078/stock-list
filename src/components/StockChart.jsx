
import Chart from 'react-apexcharts'
import {useNavigate} from 'react-router-dom'
import {useState} from "react"
import {LiveStock} from "../components/LiveStock"

export const StockChart=({chartData,symbol})=>{  
  const {day,week,year}=chartData
  const [dateFormat,setDateFormat]=useState("24h")
  const [showLive,setShowLive]=useState(false)
  const navigate=useNavigate()
  const determineTimeFormat=()=>{
    switch(dateFormat){
      case "24h":
        return day
      case "7d":
        return week
      case "1y":
        return year
      default:
        return day
    }
  }
  
  const data=determineTimeFormat()
  const color =data[data.length-1].y-data[0].y>0?"#26C281":"#ed3419"
  const options={
    colors:[color],
    title:{
      text:symbol,
      align:"center",
      style:{
        fontSize:"24px"
      }
    },
    chart:{
      id:"stock data",
      animations:{
        speed:1300
      }
    },
    xaxis:{
      type:"datetime",
      labels:{
        datetimeUTC:false
      }
    },
    tooltip:{
      x:{
        format:"MMM dd HH:MM"
      }
    }
  }
  
    const series=[{
      name:symbol,
      data:determineTimeFormat()
    }]
  const renderButtonSelect=(button)=>{
    const classes="btn m-1"
    if(button===dateFormat){
      return classes+" btn-primary"
    }else{
      return classes +" btn-outline-primary"
    }
  }
  return (
    <div className="mt-3 p-4 shadow-sm bg-white  ">
      
    <Chart options={options} series={series} type="area" width="100%" height={window.innerWidth>=1000?'400px':'auto'}/>
      {showLive && <LiveStock symbol={symbol}/>}
      
      <div>
      <button onClick={()=>setDateFormat("24h")} className={renderButtonSelect("24h")}>24h</button>
      <button onClick={()=>setDateFormat("7d")} className={renderButtonSelect("7d")}>7d</button>
      <button onClick={()=>setDateFormat("1y")} className={renderButtonSelect("1y")}>1y</button>
      <button onClick={()=>setShowLive(x=>!x)} className={`btn m-1 ${showLive?"btn-primary":"btn-outline-primary"}`}>Live</button>

      </div>
    </div>
  )
}  