import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Registration from './pages/Registration/Registration'
import Profile from './pages/Profile/Profile'
import ProfileEdit from './pages/Profile/ProfileEdit'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<ProfileEdit />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
