import React from 'react'
import { Logo } from '../../assets'

const PageWithNavbar = ({ children }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row md:px-12 px-1 py-4 shadow border justify-between md:text-xl text-sm items-center">
                <div className='w-1/3 flex justify-center'>
                    <img src={Logo} alt="logo" />
                </div>
                <span className='w-1/3 text-center'>Assignment Test</span>
                <a href="https://github.com/Varis0282" className='text-[#6C5DD3] text-center w-1/3'>Github</a>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default PageWithNavbar