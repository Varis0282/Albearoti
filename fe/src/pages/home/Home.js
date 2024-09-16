import React, { useEffect, useState } from 'react'
import { BlogGrid, PageWithNavbar } from '../../common/components'
import { setUser } from '../../redux/userReducer';
import { setLoading } from '../../redux/loaderReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserByToken } from '../../common/apis/users';
import { getBlogsList } from '../../common/apis/blogs';
import { message } from 'antd';

const Home = () => {

  const [blogs, setBlogs] = useState([]);
  const { search } = useSelector(state => state.searches);

  const dispatch = useDispatch();
  const navigate = useNavigate();


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

  const getBlogs = async (body) => {
    if (!body?.pageSize) {
      body = { ...body, pageSize: 100 };
    }
    if (!body?.current) {
      body = { ...body, current: 1 };
    }
    if (search.length > 0) {
      body = { ...body, search: search }
    }
    let user = JSON.parse(localStorage.getItem('user'));
    if (user?.role === 'user') {
      body = {
        ...body, status: {
          $in: ['published']
        }
      }
    }
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoading(true));
      const data = await getBlogsList(body);
      if (data?.success) {
        setBlogs(data?.data);
        message.success(data?.message || 'Blogs fetched successfully');
      }
      else {
        console.log(data);
      }
    } else {
      navigate('/login');
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    fetchAndSetUser();
    getBlogs();
  }, [search])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageWithNavbar>
      <div className="flex flex-col bg-[#FAFAFB]">
        <div className="flex flex-row w-full md:px-16 lg:px-16 px-4 pt-8">
          <span className='lg:text-2xl md:text-2xl text-[16px] font-medium md:w-64'>Blogs ({blogs.length})</span>
          <div className='justify-end flex w-full lg:gap-5 md:gap-5 gap-1'>
            <button className='lg:shadow-xl md:shadow-xl border border-white lg:text-[16px] md:text-[16px] text-[12px] text-[#6C5DD3] lg:px-8 md:px-8 px-3 lg:py-3 md:py-3 py-1 lg:font-medium md:font-medium font-medium rounded-xl bg-white' onClick={() => navigate('/blog/new')}>Add New</button>
            <button className='lg:shadow-xl md:shadow-xl lg:text-[16px] md:text-[16px] text-[12px] text-white bg-[#6C5DD3] lg:px-8 md:px-8 px-3 lg:py-3 md:py-3 py-1 lg:font-medium md:font-medium font-medium rounded-xl' onClick={() => { getBlogs() }}>Refresh</button>
          </div>
        </div>
        {blogs ? <BlogGrid blogs={blogs} /> : ''}
      </div>
    </PageWithNavbar>
  )
}

export default Home