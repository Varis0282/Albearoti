import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import { Logo, MaskCopy, MobileLogo, TabLogo } from '../../assets';
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../../redux/searchReducer';
import { setUser } from '../../../redux/userReducer';
import { setLoading } from '../../../redux/loaderReducer';



const Navbar = () => {

  let { user } = useSelector(state => state.users);


  const dispatch = useDispatch();

  const fetchAndSetUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoading(true));
      const user = await getUserByToken(token);
      if (user.success) {
        localStorage.setItem('user', JSON.stringify(user.data));
        dispatch(setUser(user.data));
      }
    } else {
      navigate('/login');
    }
    dispatch(setLoading(false));
  }

  const [search, setSearchInLocal] = useState('')


  const handleSearch = (e) => {
    dispatch(setSearch(search));
  }

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  return (
    <header className="w-full flex md:flex-row lg:flex-row flex-col-reverse bg-white lg:border-b md:border-b lg:p-4 md:p-4 px-4 py-2 md:justify-between lg:justify-between justify-evenly items-start md:h-20 lg:h-20 h-32">
      <div className='flex flex-row justify-between md:pl-3 lg:pl-3 w-full md:w-auto'>
        <div className="justify-center items-center text-[#6C5DD3] w-1/6 text-xl font-bold pl-2 md:flex lg:flex hidden">
          <img src={Logo} alt="Jadwa" className='lg:block md:hidden sm:hidden' />
          <img src={TabLogo} alt="Jadwa" className='hidden md:block lg:hidden' />
        </div>
        <div className='flex gap-7 items-center md:pl-12 lg:pl-36 text-gray-400 justify-between w-full'>
          <select className="border border-gray-300 p-2 rounded-xl text-gray-400 font-normal text-[12px] w-44 h-9" disabled>
            <option>Afterglow</option>
          </select>
          <div className='flex gap-2 items-center justify-center cursor-pointer'>
            <span className='text-[12px] font-medium'>Scenario</span>
            <span className='text-[12px] font-medium text-gray-500'>Default</span>
            <span><IoChevronDownOutline size={14} /></span>
          </div>
        </div>
      </div>
      <div className="flex lg:items-center md:items-center items-center lg:w-[auto] md:w-[auto] w-full justify-between">
        <span className='text-[#6C5DD3]'><FaChevronLeft className='md:hidden' /></span>
        <img src={MobileLogo} alt="Logo" className='lg:hidden md:hidden' />
        <div className='flex items-center'>
          <div className="flex items-center justify-center text-gray-500">
            <CiSearch size={18} color='#9D9DAA' fontWeight={700} />
            <input
              type="text"
              placeholder="Search..."
              className="border-none outline-none ml-2 text-[12px] font-medium lg:block md:block hidden"
              onChange={(e) => setSearchInLocal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            />
          </div>
          <div className="ml-4 flex items-center">
            <img
              src={MaskCopy}
              alt="User Avatar"
              className="rounded-full w-10 h-10"
            />
            <div className="ml-2 hidden lg:block md:block">
              <p className="text-sm font-semibold">{user?.name || 'UserName'}</p>
              <p className="text-xs text-gray-500">{user?.role?.slice(0, 1).toUpperCase() + user?.role?.slice(1, user?.role?.length) || 'User'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar