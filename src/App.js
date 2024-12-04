import React, { useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './component/global/Navabr'
import './App.css'
import Home from './component/pages/Home'
import Footer from './component/global/Footer '
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  AOS.init({
    duration: 2000, 
    easing: 'ease-in-out',
    // once: false,
  });
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