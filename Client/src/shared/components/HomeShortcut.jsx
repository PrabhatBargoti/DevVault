import React from 'react'
import BigDarkBtn from './BigDarkBtn'
import { useNavigate } from "react-router-dom";

const HomeShortcut = () => {

    const navigate = useNavigate()

    const home = ()=> {
        navigate('/')
    }

    return (
        <div className='fixed bottom-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] left-[calc(env(safe-area-inset-left,0px)+0.75rem)] z-20 sm:bottom-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] sm:left-[calc(env(safe-area-inset-left,0px)+1.25rem)]'>
            <BigDarkBtn onClick={home} name={"Home"} className='cursor-pointer px-3 py-2 text-sm sm:px-5 sm:py-3 sm:text-base' />
        </div>
    )
}

export default HomeShortcut
