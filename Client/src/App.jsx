import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Tags from './Layouts/Tags'
import Categorie from './Layouts/Categorie'
import Page404 from './Pages/Page404'
import Setting from './Layouts/Setting'
import LandingPage from './Layouts/LandingPage'
import ForgetPass from './Pages/ForgetPass'
import Home from './Layouts/Home'
import Snippets from './Layouts/Snippets'

const App = () => {
  return (
    <div className='bg-[#0B0D12] selection:bg-[#1C2029]'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Snippet" element={<Snippets />} />
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
