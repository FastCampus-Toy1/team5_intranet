import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import Notice from './components/Notice.jsx'
// import Login from './components/Login.jsx'
import "./App.scss"
import { Reset } from 'styled-reset'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Reset />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        {/* <Route path="/login" element={<Login/>}></Route> */}
        <Route path="/notice" element={<Notice/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)