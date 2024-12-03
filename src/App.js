import React, { useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './component/global/Navabr'
import './App.css'
import Home from './component/pages/Home'
import Footer from './component/global/Footer '

const App = () => {
  const navRef = useRef(null);
  return (
    <>
    <BrowserRouter>
  <Navbar navRef={navRef}/>
    <Routes>
      <Route path="/" element={<Home navRef={navRef} />} />
    
      <Route>

      </Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App