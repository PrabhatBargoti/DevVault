import React from 'react'
import SEO from "../Components/SEO";
import HomeEmpty from '../Pages/Homepage/HomeEmpty';
import HomeFill from '../Pages/Homepage/HomeFill';
import Sidebar from '../Pages/Sidebar';

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge."
        path="/home"
        noIndex
      />
      <Sidebar />
      <HomeEmpty />
      <HomeFill />
    </>
  )
}

export default Home
