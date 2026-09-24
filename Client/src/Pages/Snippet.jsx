import React from "react";
import SEO from "../Components/SEO";

const Snippet = () => {
  return (
    <>
      <SEO
        title="Snippets"
        description="Save, organize, search, and manage your reusable code snippets in DevVault."
        path="/snippets"
        noIndex
      />
      <div>Snippets</div>
    </>
  );
};

export default Snippet;
