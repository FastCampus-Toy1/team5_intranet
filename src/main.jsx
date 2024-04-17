import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Attendance from './pages/Attendance/Attendance.jsx'
import App from './App.jsx'
import "./App.scss"
import { Reset } from 'styled-reset'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Reset />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/attendance" element={<Attendance/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)