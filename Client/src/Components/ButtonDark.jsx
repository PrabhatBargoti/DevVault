import React from 'react'

const ButtonDark = ({ name, onClick, className = "" }) => {
  return (
    <button type="button" onClick={onClick} className={`rounded-xl border-2 border-[#232733] bg-[#12151C] px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-[#1C2029] active:scale-95 ${className}`}>
      {name}
    </button>
  )
}

export default ButtonDark
