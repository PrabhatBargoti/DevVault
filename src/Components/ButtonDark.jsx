import React from 'react'

const ButtonDark = (props) => {
  return (
    <div className='border-2 border-[#232733] text-[#E7E9EE] px-5 py-2 rounded-2xl font-semibold bg-[#171B24] my-10 mx-2 cursor-pointer active:scale-95 transition-all duration-200'>
      {props.name}
    </div>
  )
}

export default ButtonDark
