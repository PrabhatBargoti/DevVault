import React from "react";
import SEO from "../Components/SEO";
import ButtonDark from "../Components/ButtonDark";
import ButtonPurple from "../Components/ButtonPurple";
import { useNavigate } from "react-router-dom";
import { Sun } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const gotoLog = () => {
    navigate("/Login");
  };

  const gotoStart = () => {
    navigate("/Signup");
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title="Your Developer Knowledge Vault"
        description="Save, organize, and find your code snippets, notes, and developer knowledge in one powerful vault."
        path="/"
      />
      <div className="relative flex flex-row items-center justify-between px-8 h-16 bg-[#0B0B0F] border-b border-white/5">
        <div className="flex items-center gap-2">
          <img src="/Logo.svg" alt="DevVault" className="h-8 w-8" />
          <span className="text-[#E7E9EE] font-semibold">DevVault</span>
        </div>

        <nav className="hidden md:flex flex-row justify-center gap-10 items-center text-[#8B93A7] text-sm absolute left-1/2 -translate-x-1/2">
          <span
            className="cursor-pointer hover:text-white transition-colors"
            onClick={() => scrollToSection("features")}
          >
            Features
          </span>
          <span
            className="cursor-pointer hover:text-white transition-colors"
            onClick={() => scrollToSection("how-it-works")}
          >
            How it works
          </span>
          <span
            className="cursor-pointer hover:text-white transition-colors"
            onClick={() => scrollToSection("open-source")}
          >
            Open source
          </span>
        </nav>

        <div className="flex flex-row items-center">
          <button className="cursor-pointer">
            <Sun color="white"/>
          </button>
          <span onClick={gotoLog}>
            <ButtonDark name={"Log in"} />
          </span>
          <span onClick={gotoStart}>
            <ButtonPurple name={"Get started"} />
          </span>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
