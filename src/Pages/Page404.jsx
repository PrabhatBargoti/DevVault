import React from "react";
import SEO from "../Components/SEO";

const Page404 = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have been moved."
        path="*"
        noIndex
      />
      <div>Page Not Found</div>
    </>
  );
};

export default Page404;
