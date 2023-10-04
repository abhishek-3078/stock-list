import {useState,useEffect,useContext} from 'react'
import finnhub from "../apis/Finnhub"
import {WatchListContext} from "../context/watchListContext"

export const AutoComplete=()=>{
  const [search,setSearch]=useState("")
  const [results,setResults]=useState([])
  const {addStock}=useContext(WatchListContext)
  const renderDropDown=()=>{
    const dropDownClass=search?"show":null;
    return <ul style={{
      height:"500px",
      overflowY:"scroll",
      overflowX:"hidden",
      cursor:"pointer"
    }} 
             
             className={`dropdown-menu ${dropDownClass}`}>
      {results.map(result=>{
      console.log(result)
      return <li onClick={()=>{setSearch(""); return addStock(result.symbol)}} key={result.symbol} className="dropdown-item">{result.description }({result.symbol}) </li>
      })}
    </ul>
  }
  useEffect(()=>{
    let isMounted=true;
    const fetchData=async()=>{
      try{
        const response=await finnhub.get("/search",{
          params:{
            q:search
          }
        })
        if(isMounted){
          setResults(response.data.result)
          console.log(response)
        }
      }catch(e){
        console.log(e)
      }
    }
    if(search.length>0){
    fetchData()
      
    }else{
      setResults([])
    }
    return ()=>isMounted=false
  },[search])
  return <div className="w-50 p-4 rounded mx-auto">
    <div className="form-floating dropdown">
    <input style={{backgroundColor:"rgba(145,158,171,0.4"}} id='search' className="form-control" autoComplete="off" placeholder="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <label htmlFor="search">Search</label>
      {renderDropDown()}
      
    </div>
  
  </div>
}