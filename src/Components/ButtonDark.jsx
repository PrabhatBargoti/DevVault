import React from 'react'

const ButtonDark = (props) => {
  return (
    <div className='border-2 border-[#232733] px-5 py-1 rounded-xl font-semibold bg-[#12151C] my-10 mx-2 cursor-pointer active:scale-95 transition-all duration-200 hover:[#1C2029] select-none'>
      {props.img && (
        <img src={props.img} alt='' className='w-5 h-5 inline-block mr-2' /> 
      )} {/*  Only when SVG or Img req */}
      {props.name}
    </div>
  )
}

export default ButtonDark
