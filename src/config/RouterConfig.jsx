import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../screens/Home'
import Navbar from '../components/Navbar'
import Login from '../screens/Login'
import Register from '../screens/Register'

const RouterConfig = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />

            </Routes>
        </BrowserRouter>
    )
}

export default RouterConfig