import React from 'react'
import BigPurpleBtn from '../../Components/BigPurpleBtn'
import { useNavigate } from 'react-router-dom'

const LandingCTA = () => {

  const nav = useNavigate();

  const gotoSign = () => {
    nav('/Signup')
  }

  return (
    <section className="flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex flex-col items-center text-center max-w-2xl ">
        <h1 className="text-[#E7E9EE] font-bold text-3xl leading-[1.1] sm:text-4xl tracking-tight">
          Stop re-solving the same problem.
        </h1>
        <div className="mt-8"><BigPurpleBtn name="Get started free" onClick={gotoSign} /></div>
      </div>
    </section>
  )
}

export default LandingCTA