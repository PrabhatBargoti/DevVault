import React from 'react'

const Logo = () => {

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("Hero")}>
            <img src="/Logo.svg" alt="DevVault" className="h-10 w-10 select-none" />
            <span className="text-2xl font-semibold">Dev<span className='text-[#6E6BF4]'>Vault</span></span>
        </div>
    )
}

export default Logo
