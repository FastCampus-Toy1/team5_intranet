import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import Notice from './pages/Notice.jsx';
import Notice_Add from './pages/Notice_Add.jsx'
// import Login from './pages/Login.jsx'
import "./App.scss"
import { Reset } from 'styled-reset'
import LoginPage from './pages/Login.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Reset />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/notice" element={<Notice/>}></Route>
        <Route path="/noticeAdd" element={<Notice_Add/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)