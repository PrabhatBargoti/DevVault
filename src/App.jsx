import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Snippet from './Pages/Snippet'
import Tags from './Pages/Tags'
import Categorie from './Pages/Categorie'
import Page404 from './Pages/Page404'
import Setting from './Pages/Setting'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Snippet" element={<Snippet />} />
        <Route path="/Tags" element={<Tags />} />
        <Route path="/Categorie" element={<Categorie />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  )
}

export default App
