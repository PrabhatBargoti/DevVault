import React, { useState } from 'react'
import Logo from '../Components/Logo'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavItem } from '../Utils/NavItem'
import { Menu, Settings, X } from 'lucide-react'

const Sidebar = () => {
  const navigation = useNavigate()
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const gotohome = () => {
    navigation('/Home')
    setIsMenuOpen(false)
  }

  const navigateTo = (path) => {
    navigation(path)
    setIsMenuOpen(false)
  }

  return (
    <aside className="relative z-20 flex w-full flex-col border-b border-[#232733] bg-[#0B0D12] p-3 font-sans md:min-h-dvh md:w-64 md:shrink-0 md:justify-between md:border-b-0 md:border-r md:p-4">
      <div>
        <div className="flex items-center justify-between px-1 py-1 md:mb-4 md:px-2 md:py-2">
          <button type="button" className="flex shrink-0 cursor-pointer items-center gap-2" onClick={gotohome} aria-label="Go to DevVault home">
            <Logo />
          </button>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="sidebar-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#232733] text-[#8B93A7] transition-colors hover:bg-[#1C2029] hover:text-[#E7E9EE] md:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav
          id="sidebar-navigation"
          className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col gap-1 pb-1 pt-2 md:flex md:pb-0 md:pt-0`}
        >
          {NavItem.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={pathname === item.path ? 'page' : undefined}
              onClick={() => navigateTo(item.path)}
              className={`flex cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === item.path
                  ? 'bg-[#22243B] text-[#E7E9EE]'
                  : 'text-[#8B93A7] hover:bg-[#1C2029] hover:text-[#E7E9EE]'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={pathname === item.path ? 'text-[#9290FF]' : ''}>{item.svg}</span>
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} mt-2 border-t border-[#232733] pt-2 md:mt-0 md:block md:border-t-0 md:pt-4`}>
        <button
          type="button"
          aria-current={pathname === '/Setting' ? 'page' : undefined}
          onClick={() => navigateTo('/Setting')}
          className={`flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            pathname === '/Setting'
              ? 'bg-[#22243B] text-[#E7E9EE]'
              : 'text-[#8B93A7] hover:bg-[#1C2029] hover:text-[#E7E9EE]'
          }`}
        >
          <span className="flex items-center gap-3">
            <Settings size={18} strokeWidth={1.8} />
            Settings
          </span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar