import React from 'react'

const BigDarkBtn = (props) => {
  return (
    <div className='border-2 border-[#232733] p-3 rounded-xl font-semibold bg-[#12151C] my-10 mx-2 cursor-pointer active:-scale-95 transition-all duration-200 hover:[#1C2029] select-none inline'>
      {props.name}
    </div>
  )
}

export default BigDarkBtn
