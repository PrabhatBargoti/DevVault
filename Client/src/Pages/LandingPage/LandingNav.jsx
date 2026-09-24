import React from 'react'
import ButtonDark from "../../Components/ButtonDark";
import ButtonPurple from "../../Components/ButtonPurple";
import { useNavigate } from "react-router-dom";
import useScrollToSection from '../../hooks/useScrollToSection';
import Logo from '../../Components/Logo';

const LandingNav = () => {
    const navigate = useNavigate();
    const scrollToSection = useScrollToSection();

    return (
        <section className="flex h-16 w-full items-center justify-between border-b border-white/5 px-4 sm:px-6 lg:px-8">
            <button type="button" className="flex shrink-0 items-center gap-2" onClick={() => scrollToSection("Hero")}>
                <Logo />
            </button>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm text-[#8B93A7] lg:flex">
                <button type="button" className="transition-colors hover:text-white" onClick={() => scrollToSection("features")}>Features</button>
                <button type="button" className="transition-colors hover:text-white" onClick={() => scrollToSection("how-it-works")}>How it works</button>
                <button type="button" className="transition-colors hover:text-white" onClick={() => scrollToSection("open-source")}>Open source</button>
            </nav>

            <div className="flex shrink-0 items-center gap-2">
                <ButtonDark name="Log in" className="hidden sm:block" onClick={() => navigate("/Login")} />
                <ButtonPurple name="Get started" onClick={() => navigate("/Signup")} />
            </div>
        </section>
    )
}

export default LandingNav
