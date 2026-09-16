import React from "react";
import BigDarkBtn from "../../Components/BigDarkBtn";
import BigPurpleBtn from "../../Components/BigPurpleBtn";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {

  const navigation = useNavigate();

  const gotoSign = () => {
    navigation('/Signup')
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-2xl -mt-10">
        <h1 className="text-[#E7E9EE] font-bold text-5xl sm:text-6xl leading-[1.1] tracking-tight">
          Your developer
          <br />
          knowledge vault.
        </h1>

        <p className="mt-6 text-[#8B93A7] text-lg leading-relaxed max-w-md">
          Save it once. Find it instantly. Build faster. Code snippets,
          commands, and fixes — kept in one place you actually search.
        </p>
        <div className=" flex items-center justify-center gap-3 mt-8">
          <span onClick={gotoSign}>
          <BigPurpleBtn name={"Get started free"} className="w-auto" />
          </span>
          <a href="https://github.com/PrabhatBargoti/DevVault" target="_blank" rel="noopener noreferrer">
          <BigDarkBtn name={"View on GitHub"} img={'../../public/github.png'} className="w-auto" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;