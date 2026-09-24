import React from 'react'

const LandingFooter = () => {
  return (
    <footer className="border-t border-[#232733] bg-[#0B0D12]">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2 px-4 py-6 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <p className="text-sm text-[#8B93A7]">
          DevVault — open source developer knowledge vault
        </p>
        <p className="text-sm text-[#5A6275]">
          MIT licensed
        </p>
      </div>
    </footer>
  )
}

export default LandingFooter
