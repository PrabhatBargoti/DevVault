import React from 'react'
import SEO from "../Components/SEO";
import Sidebar from '../Pages/Sidebar';
import HomeEmpty from '../Pages/Homepage/HomeEmpty/HomeEmpty';

const Home = () => {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <SEO
        title="Home"
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge."
        path="/home"
        noIndex
      />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <HomeEmpty />
      </div>
    </div>
  )
}

export default Home
