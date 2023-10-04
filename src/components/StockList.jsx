import {useState,useEffect,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import finnhub from "../apis/Finnhub"
import {BsFillCaretDownFill,BsFillCaretUpFill} from 'react-icons/bs'
import {WatchListContext} from "../context/watchListContext"
import {MdDelete} from "react-icons/md"

export const StockList=(props)=>{
  const [stock,setStock]=useState([])
  const {watchList,deleteStock}=useContext(WatchListContext)
  const navigate=useNavigate()
  
  const renderIcon=(change)=>{
    if (change>0) return <BsFillCaretDownFill/>;
    else  return <BsFillCaretUpFill/>
  }
  // console.log(watchList)
  useEffect(()=>{
    let isMounted=true;
    const fetchData=async ()=>{
      try{
       
      const responses=await Promise.all(watchList.map(stock=>{
        return finnhub.get("/quote",{
          params:{
            symbol:stock
          }
        })
      }))
        
        const data=responses.map((response)=>{
        return  {
          data:response.data,
          symbol:response.config.params.symbol
          }
        })
        
        if(isMounted){
        setStock(data)
        }
      }catch(error){
        
      }
    }
    fetchData();
    return ()=>(isMounted=false) //cleanup function which execute when the component gets unmounted)
    
  },[watchList])


  const handleStockClick=(symbol)=>{
    navigate(`detail/${symbol}`)
  }
  return <div>
  <table className="table container table-hover mt-5">
    <thead style={{color:"rgb(79,89,102"}}>
      <tr>
      <th scope="col">Name</th>
      <th scope="col">Last</th>
      <th scope="col">Chg</th>
      <th scope="col">Chg%</th>
      <th scope="col">High</th>
      <th scope="col">Low</th>
      <th scope="col">Open</th>
      <th scope="col">Pclose</th>
      </tr>

    </thead>
    <tbody>
      {stock.map(stockData=>{
    return (
      <tr style={{cursor:"pointer"}} onClick={()=>handleStockClick(stockData.symbol)} className="table-row" key={stockData.symbol}>
      <th scope="row">{stockData.symbol}</th>
      <td>{stockData.data.c}</td>
      <td className={`text-${stockData.data.d>0?"success":"danger"}`}>{stockData.data.d}</td>
      <td className={`text-${stockData.data.dp>0?"success":"danger"}`}>{stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
      <td >{stockData.data.h}</td>
      <td>{stockData.data.l}</td>
      <td>{stockData.data.o}</td>
      <td>{stockData.data.pc}</td>
      <td><div className="delete-button" onClick={(e)=>{
        e.stopPropagation()
        deleteStock(stockData.symbol)
      }}><MdDelete color={"#e92424"} size={"1.4rem"} /></div></td>
      </tr>
    )
      })}
    </tbody>
  </table>
  </div>
}