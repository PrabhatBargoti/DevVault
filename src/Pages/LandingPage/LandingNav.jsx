import React from 'react'
import ButtonDark from "../../Components/ButtonDark";
import ButtonPurple from "../../Components/ButtonPurple";
import { useNavigate } from "react-router-dom";

const LandingNav = () => {
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
        <section className="flex w-full flex-row items-center justify-between px-8 h-16 border-b border-white/5">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("Hero")}>
                <img src="/Logo.svg" alt="DevVault" className="h-10 w-10 select-none" />
                <span className="text-2xl font-semibold">Dev<span className='text-[#6E6BF4]'>Vault</span></span>
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
                <span onClick={gotoLog}>
                    <ButtonDark name={"Log in"} />
                </span>
                <span onClick={gotoStart}>
                    <ButtonPurple name={"Get started"} />
                </span>
            </div>
        </section>
    )
}

export default LandingNav
