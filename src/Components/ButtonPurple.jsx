import React from 'react'

const ButtonPurple = (props) => {
  return (
    <div className='border-2 border-[#232733] text-[#E7E9EE] px-5 py-1 rounded-xl font-semibold bg-[#6E6BF4] my-10 mx-2 cursor-pointer active:scale-95 transition-all duration-200 hover:bg-[#8280F7]'>
      {props.name}
    </div>
  )
}

export default ButtonPurple
