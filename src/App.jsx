import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/home" element={<Home/>} />
      <Route path="/*" element={<Login/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
