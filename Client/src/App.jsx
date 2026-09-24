import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Snippet from './Pages/Snippet'
import Tags from './Pages/Tags'
import Categorie from './Pages/Categorie'
import Page404 from './Pages/Page404'
import Setting from './Pages/Setting'
import LandingPage from './Layouts/LandingPage'
import ForgetPass from './Pages/ForgetPass'
import Home from './Layouts/Home'

const App = () => {
  return (
    <div className='bg-[#0B0D12] selection:bg-[#1C2029]'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Snippet" element={<Snippet />} />
        <Route path="/Tags" element={<Tags />} />
        <Route path="/Categorie" element={<Categorie />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/forgot-password" element={<ForgetPass />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  )
}

export default App
