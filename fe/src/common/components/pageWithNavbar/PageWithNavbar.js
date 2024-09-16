import React from 'react';
import { Navbar } from '../navbar';
import { SideBar } from '../sidebar';

const PageWithNavbar = ({ children }) => {
    return (
        <div className='flex flex-row h-screen'>
            <div className='w-full fixed md:h-20 lg:h-20 h-32'>
                <Navbar />
            </div>
            <div className="h-full md:mt-20 lg:mt-20 mt-32 flex flex-row w-full">
                <div className='lg:w-60 md:w-20 fixed md:h-[90%] bottom-0 md:bottom-auto w-full lg:block md:block'><SideBar /></div>
                <div className='lg:ml-56 md:ml-12 w-full'>{children}</div>
            </div>
        </div>
    );
}

export default PageWithNavbar;