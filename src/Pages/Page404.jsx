import React from "react";
import SEO from "../Components/SEO";
import ButtonDark from "../Components/ButtonDark";
import ButtonPurple from "../Components/ButtonPurple";

const Page404 = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have been moved."
        path="*"
        noIndex
      />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-8xl font-bold text-[#6E6BF4]">404</h1>
        <span className="text-[#E7E9EE] text-3xl font-bold my-10">This page isn’t in the vault</span>
        <p className="text-[#8B93A7]">The link may be out of date, or the snippet was deleted.</p>
        <div className="flex flex-row justify-center-safe ">
        <ButtonDark name={"Browser Snippets"} />
        <ButtonPurple name={"Go to Dashboard"} />
        </div>
      </div>
    </>
  );
};

export default Page404;
