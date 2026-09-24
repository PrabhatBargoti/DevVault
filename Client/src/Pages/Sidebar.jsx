import React from 'react'
import Logo from '../Components/Logo'
import { useNavigate } from 'react-router-dom'
import { NavItem } from '../Utils/NavItem'
import UserProfile from '../Components/UserProfile'

const Sidebar = () => {
  const navigation = useNavigate()

  const gotohome = () => {
    navigation('/Home')
  }

  return (
    <div className="flex h-screen w-64 flex-col justify-between border-r border-[#232733] bg-[#12151C] p-4 font-sans">

      <div>
        <div className="flex items-center gap-2 px-2 py-2 mb-4">
          <button type="button" className="flex shrink-0 items-center gap-2 cursor-pointer" onClick={gotohome}>
            <Logo />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {NavItem.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => navigation(item.path)}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer`}
              >
                <span className="flex items-center gap-3">
                  {item.id}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
      
      <UserProfile />
    </div>
  )
}

export default Sidebar