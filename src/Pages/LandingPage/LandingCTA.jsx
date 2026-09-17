import React from 'react'
import BigPurpleBtn from '../../Components/BigPurpleBtn'
import { useNavigate } from 'react-router-dom'

const LandingCTA = () => {

  const nav = useNavigate();

  const gotoSign = () => {
    nav('/Signup')
  }

  return (
    <section className="h-80 flex items-center justify-center px-6 py-20 -mt-30">
      <div className="flex flex-col items-center text-center max-w-2xl ">
        <h1 className="text-[#E7E9EE] font-bold text-4xl leading-[1.1] tracking-tight">
          Stop re-solving the same problem.
        </h1>
        <span onClick={gotoSign} className='mt-10'>
          <BigPurpleBtn name={"Get started free"} className="w-auto" />
          </span>
      </div>
    </section>
  )
}

export default LandingCTA
