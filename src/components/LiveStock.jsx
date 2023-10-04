
import Chart from 'react-apexcharts'
import {useNavigate} from 'react-router-dom'
import {useState,useEffect} from "react"
import finnhub from "../apis/Finnhub"
export const LiveStock=({symbol})=>{  
  
  // const symbol="GOOGL"
  const [data,setData]=useState([])
  // const [prevTime,setPrevTime]=useState(new Date().getTime())
  let prevTime=new Date().getTime()
  let x=new Date().getTime(),y=0;
  
  useEffect(()=>{
    
  const groupDataByInterval=(newData)=>{
    let n=newData.length;
    let y=0;
    newData.forEach(value=>{
      y=(value.p>y)?value.p:y
      // console.log(y,value.p)
    })
  
    if(data==[]||newData[newData.length-1].t-prevTime>=1000){
       setData(d=>{
    const updated=[...d,{x:prevTime,y}]
         prevTime=new Date().getTime()
    if(updated.length>50){
      updated.shift()
    }
    return updated
  })
      console.log("data",data)
  }
  }
    const socket = new WebSocket('wss://ws.finnhub.io?token=cire2i1r01qrvprj0apgcire2i1r01qrvprj0aq0');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
      groupDataByInterval(JSON.parse(event.data).data)
  
});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}
     

  },[])
  
// useEffect(()=>{
//   console.log(prevTime)
// setPrevTime(new Date().getTime())
//   console.log(prevTime)
// },[data])
  
  const options={
    title:{
      text:"RealTime",
      align:"center",
      style:{
        fontSize:"24px"
      }
    },
    chart:{
      id:"realtime",
      animations:{
        enabled:false
        // enabled: true,
        //     easing: 'linear',
        //     dynamicAnimation: {
        //       speed: 1300
        //     }
      }
    },
    xaxis:{
      type:"datetime",
      labels:{
        datetimeUTC:false
      },
    },
    tooltip:{
      x:{
        format:"MMM dd HH:MM"
      }
    }
  }
 const series=[{
      name:symbol,
      data,
    }]
  return (
    <div className="mt-3 p-4 shadow-sm bg-white  ">

    <Chart options={options} series={series} type="area" width="100%" height={window.innerWidth>=1000?'400px':'auto'}/>
      <div>
      </div>
    </div>
  )
}  