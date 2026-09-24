import React from 'react'

const BigPurpleBtn = ({ name, onClick, className = "" }) => {
  return (
    <button type="button" onClick={onClick} className={`rounded-xl border-2 border-[#5E5AE6] bg-[#6E6BF4] px-5 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#8280F7] active:scale-95 ${className}`}>
      {name}
    </button>
  )
}

export default BigPurpleBtn
