import {AutoComplete} from "../components/AutoComplete"
import {StockList} from "../components/StockList"
import {WatchListContextProvider} from  '../context/watchListContext'
import image from '/logo.png'
export const StockOverviewPage=()=>{
  return <div>
    <div className="text-center mt-4">
     <img style={{width:'100px'}}  src={image}/>
      <h3>Stock Data</h3>
    </div>
    <WatchListContextProvider>
  <AutoComplete/>
    <StockList/>
      </WatchListContextProvider>
  </div>
}