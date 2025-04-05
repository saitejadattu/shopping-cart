import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import './App.css'
import ProductDetail from './components/ProductDetailedView'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        <Route path="*" element={<div className='h-screen flex justify-center items-center'><p>Not Found</p></div>} />
      </Routes>
    </Router>
  )
}

export default App