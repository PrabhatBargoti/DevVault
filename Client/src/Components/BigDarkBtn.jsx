import React from 'react'

const BigDarkBtn = ({ name, onClick, className = "" }) => {
  return (
    <button type="button" onClick={onClick} className={`rounded-xl border-2 border-[#232733] bg-[#12151C] px-5 py-3 font-semibold transition-all duration-200 hover:bg-[#1C2029] active:scale-95 ${className}`}>
      {name}
    </button>
  )
}

export default BigDarkBtn
