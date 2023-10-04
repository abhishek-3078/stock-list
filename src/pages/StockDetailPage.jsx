import {useParams} from "react-router-dom"
import {useEffect,useState} from 'react'
import finnhub from "../apis/Finnhub"
import { StockChart } from "../components/StockChart"
import { StockData } from "../components/StockData"
import {Link} from  'react-router-dom'
const formatData=(data)=>{
  return data.t.map((el,index)=>{
    return {
      x:el*1000,
      y:Math.round(data.c[index]*100)/100
    }
  })
}
export const StockDetailPage=()=>{
  
  const {symbol}=useParams()
  const [chartData,setChartData]=useState()
    useEffect(()=>{

      
      const fetchData=async()=>{
        const date= new Date()
        const currTimeSeconds=Math.floor(date.getTime()/1000)
        let oneDay=currTimeSeconds-24*60*60
        if(date.getDay()===6){
          oneDay*=2;
        }else if(date.getDay()==0){
          oneDay*=3;
        }
        
     
        const responses=await Promise.all([finnhub.get("/stock/candle",{
          params:{
            symbol,
            resolution:30,
            from:oneDay,
            to:currTimeSeconds
          }
        }),finnhub.get("/stock/candle",{
          params:{
            symbol,
            resolution:"W",
            from:currTimeSeconds-365*24*3600,
            to:currTimeSeconds
          }
        }),finnhub.get("/stock/candle",{
          params:{
            symbol,
            resolution:60,
            from:currTimeSeconds-7*24*3600,
            to:currTimeSeconds
          }
        })])
        // console.log(responses)
        setChartData({
        day:formatData(responses[0].data),
        week:formatData(responses[2].data),
        year:formatData(responses[1].data)
      })
        
      }
      fetchData()
      
    },[symbol])
  return <div>

    <div className="navbar">
      <Link to="/" className="text-decoration-none">
      <img style={{width:'50px'}} className="navbar-brand" src="/logo.png"/>
        <span className='navbar-brand text-secondary fw-bold '>Stock Data</span>
      </Link>
        </div>
    
    {chartData && (
    <div>
       
      <StockChart chartData={chartData} symbol={symbol}/>
      <StockData symbol={symbol}/>
    </div>
    )}
  </div>
}