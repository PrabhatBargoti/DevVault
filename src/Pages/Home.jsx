import React from "react";
import SEO from "../Components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge."
        path="/home"
        noIndex
      />
      <div>Home</div>
    </>
  );
};

export default Home;
