import React from "react";
import BigPurpleBtn from "../../Components/BigPurpleBtn";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {

  const navigation = useNavigate();

  const gotoSign = () => {
    navigation('/Signup')
  }

  return (
    <section id="Hero" className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-20 sm:px-6">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-[#E7E9EE] font-bold text-4xl leading-[1.1] sm:text-6xl tracking-tight">
          Your developer
          <br />
          knowledge vault.
        </h1>

        <p className="mt-6 text-[#8B93A7] text-base leading-relaxed sm:text-lg max-w-md">
          Save it once. Find it instantly. Build faster. Code snippets, commands, and fixes — kept in one place you actually search.
        </p>
        <div className=" flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center mt-5">
          <BigPurpleBtn name="Get started free" className="w-full sm:w-auto" onClick={gotoSign} />
          <a href="https://github.com/PrabhatBargoti/DevVault" className="rounded-xl border-2 border-[#232733] bg-[#12151C] px-5 py-3 font-semibold transition-colors hover:bg-[#1C2029]" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;