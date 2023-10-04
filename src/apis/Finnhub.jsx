
import axios from 'axios'
const TOKEN="cire2i1r01qrvprj0apgcire2i1r01qrvprj0aq0"

export default axios.create({
  baseURL:"https://finnhub.io/api/v1",
  params:{
    token:TOKEN
  }
})