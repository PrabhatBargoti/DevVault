import React from 'react'
import Logo from './Logo'

const HomeShortcut = () => {
    return (
        <div className='flex justify-start relative bottom-10 m-5'>
            <a href="/" rel="noopener noreferrer">
                <Logo />
            </a>
        </div>
    )
}

export default HomeShortcut
