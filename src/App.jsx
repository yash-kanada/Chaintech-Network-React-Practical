import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import './App.css'
import ChangePW from './pages/ChangePW'

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>} ></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/change-pw' element={<ChangePW/>}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>

    </>
  )
}

export default App
