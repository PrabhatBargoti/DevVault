import React from "react";
import SEO from "../Components/SEO";
import ButtonDark from "../Components/ButtonDark";
import ButtonPurple from "../Components/ButtonPurple";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const gotohome = () => {
    navigate("/Home");
  };

  const gotosnippet = () => {
    navigate("/Snippet");
  };

  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have been moved."
        path="*"
        noIndex
      />
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-7xl sm:text-8xl font-bold text-[#6E6BF4]">404</h1>
        <span className="my-6 text-2xl font-bold text-[#E7E9EE] sm:my-10 sm:text-3xl">
          This page isn't available in the vault
        </span>
        <p className="text-[#8B93A7]">
          The link may be out of date, or the snippet was deleted.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row">
          <ButtonDark name="Browse snippets" onClick={gotosnippet} />
          <ButtonPurple name="Go to dashboard" onClick={gotohome} />
        </div>
      </div>
    </>
  );
};

export default Page404;