import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {StockOverviewPage} from "./pages/StockOverviewPage"
import {StockDetailPage} from "./pages/StockDetailPage"
export default function App() {
  return (
    <main className="container">
      <Router>
      <Routes>
      <Route path ="/" element ={<StockOverviewPage/>}/>
      <Route path ="/detail/:symbol" element ={<StockDetailPage/>}/>
      </Routes>      
      </Router>
    </main>
  )
}
