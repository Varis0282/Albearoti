import React from 'react';
import { GoHome } from "react-icons/go";
import { VscListSelection } from "react-icons/vsc";
import { SlGraph } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const SideBar = () => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const isActive = (path) => pathname === path ? 'md:border-l-4 md:border-b-0 border-b-4 md:pl-7 border-[#6C5DD3] text-[#6C5DD3]' : 'md:pl-8 text-gray-400';

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return (
    <div className="lg:w-60 md:w-20 w-full bg-white flex flex-col justify-between h-full">
      <nav className="pt-4 h-full border-r flex flex-col justify-between">
        <ul className='flex md:flex-col flex-row md:w-auto w-full md:px-0 px-6 justify-evenly'>
          <li className={`p-4 hover:bg-purple-100 hover:text-[#6C5DD3] flex gap-3 items-center cursor-pointer ${isActive('/dashboard')}`}
            onClick={() => {
              message.info('This feature is not available yet');
            }}
          >
            <GoHome size={'18'} />
            <span className='hidden lg:block'>
              Dashboard
            </span>
          </li>
          <li className={`p-4 hover:bg-purple-100 hover:text-[#6C5DD3] flex gap-3 items-center cursor-pointer ${isActive('/')}`}
            onClick={() => navigate('/')}
          >
            <VscListSelection size={'16'} className='border rounded-[5px] p-0.5 border-gray-400' />
            <span className='hidden lg:block'>
              Blogs
            </span>
          </li>
          <li className={`p-4 hover:bg-purple-100 hover:text-[#6C5DD3] flex gap-3 items-center cursor-pointer ${isActive('/finances')}`}
            onClick={() => {
              message.info('This feature is not available yet');
            }}
          >
            <VscListSelection size={'16'} className='border rounded-[5px] p-0.5 border-gray-400 -rotate-90' />
            <span className='hidden lg:block'>
              Finances
            </span>
          </li>
          <li className={`p-4 hover:bg-purple-100 hover:text-[#6C5DD3] flex gap-3 items-center cursor-pointer ${isActive('/pitches')}`}
            onClick={() => {
              message.info('This feature is not available yet');
            }}
          >
            <SlGraph size={'16'} className='border rounded-[4px] p-0.5 border-gray-400' />
            <span className='hidden lg:block'>
              Pitches
            </span>
          </li>
          <li className={`p-4 flex hover:bg-purple-100 hover:text-[#6C5DD3] md:hidden gap-3 items-center cursor-pointer ${isActive('/logout')}`} onClick={logOut}>
            <CiLogout size={'18'} />
            <span className='hidden lg:block'>
              Log out
            </span>
          </li>
        </ul>
        <ul className='flex-col pb-8 hidden md:flex'>
          <li className={`p-4 hover:bg-purple-100 hover:text-[#6C5DD3] flex gap-3 items-center cursor-pointer ${isActive('/settings')}`}
            onClick={() => {
              message.info('This feature is not available yet');
            }}
          >
            <IoSettingsOutline size={'18'} />
            <span className='hidden lg:block'>
              Settings
            </span>
          </li>
          <li className={`p-4 hover:bg-purple-100 hover:text-[#6C5DD3] flex gap-3 items-center cursor-pointer ${isActive('/logout')}`} onClick={logOut}>
            <CiLogout size={'18'} />
            <span className='hidden lg:block'>
              Log out
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;