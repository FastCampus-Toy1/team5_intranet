import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import "./App.scss"
import { Reset } from 'styled-reset'
import "/src/style.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Reset />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)