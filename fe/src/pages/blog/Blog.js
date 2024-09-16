import React, { useEffect, useState } from 'react'
import { PageWithNavbar } from '../../common/components'
import { setLoading } from '../../redux/loaderReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBlog, getBlogSingle, publishBlog } from '../../common/apis/blogs';
import { Blog } from '../../common/assets';
import moment from 'moment';
import { message, Skeleton } from 'antd';

const Home = () => {

    const [blog, setBlog] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : null;
    const { loading } = useSelector((state) => state.loaders);

    const getBlogs = async (body) => {
        // get blog id from url params
        const blogId = window.location.pathname.split('/')[2];
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setLoading(true));
            const data = await getBlogSingle({ _id: blogId });
            if (data?.success) {
                setBlog(data?.data);
            }
            else {
                console.log(data);
            }
        } else {
            navigate('/login');
        }
        dispatch(setLoading(false));
    }

    const publish = async () => {
        // get blog id from url params
        const blogId = window.location.pathname.split('/')[2];
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setLoading(true));
            const data = await publishBlog({ _id: blogId, status: 'published' });
            if (data?.success) {
                setBlog(data?.data);
                message.success('Blog published successfully');
                getBlogs();
            }
            else {
                console.log(data);
            }
        } else {
            navigate('/login');
        }
        dispatch(setLoading(false));
    }

    const blogDelete = async () => {
        // get blog id from url params
        const blogId = window.location.pathname.split('/')[2];
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setLoading(true));
            const data = await deleteBlog({ _id: blogId });
            if (data?.success) {
                navigate('/');
                message.success('Blog deleted successfully');
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
        getBlogs();
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageWithNavbar>
            {loading ? (
                <div className="flex flex-col bg-[#FAFAFB] gap-12 md:px-16 lg:px-16 px-4 pt-8">
                    <div className="flex md:flex-row flex-col w-full justify-between">
                        <Skeleton.Input style={{ width: 200 }} active />
                        <div className='justify-end flex w-full lg:gap-5 md:gap-5 gap-1 pt-4 md:pt-0'>
                            <Skeleton.Button style={{ width: 100 }} active />
                            <Skeleton.Button style={{ width: 100 }} active />
                        </div>
                    </div>
                    <div className='flex flex-row w-full'>
                        <div className="w-1/2 text-center">
                            <Skeleton.Image style={{ width: '300', height: 300 }} active />
                        </div>
                        <div className="md:flex hidden flex-col items-start w-1/2 justify-between">
                            <div className='flex flex-row gap-4'>
                                <Skeleton.Input style={{ width: 100 }} active />
                                <Skeleton.Input style={{ width: 150 }} active />
                            </div>
                            <div className="flex flex-row gap-4">
                                <Skeleton.Input style={{ width: 100 }} active />
                                <Skeleton.Input style={{ width: 150 }} active />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <Skeleton.Input style={{ width: 100 }} active />
                                <Skeleton.Input style={{ width: 150 }} active />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <Skeleton.Input style={{ width: 100 }} active />
                                <Skeleton.Input style={{ width: 150 }} active />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <Skeleton.Input style={{ width: 100 }} active />
                                <Skeleton.Input style={{ width: 150 }} active />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <Skeleton.Input style={{ width: 100 }} active />
                                <Skeleton.Input style={{ width: 150 }} active />
                            </div>
                        </div>
                    </div>
                    <div className="flex border p-4 rounded-lg">
                        <Skeleton active paragraph={{ rows: 4 }} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col bg-[#FAFAFB] gap-12 md:px-16 lg:px-16 px-4 pt-8">
                    <div className="flex md:flex-row flex-col w-full justify-between">
                        <span className='md:text-xl'>{blog.title}</span>
                        {userId === blog?.createdBy?._id &&
                            <div className='justify-end flex w-full lg:gap-5 md:gap-5 gap-1 pt-4 md:pt-0'>
                                <button className='lg:shadow-xl md:shadow-xl border border-white lg:text-[16px] md:text-[16px] text-[12px] text-[#6C5DD3] lg:px-8 md:px-8 px-3 lg:py-3 md:py-3 py-1 lg:font-medium md:font-medium font-medium rounded-xl bg-white' onClick={() => { navigate(`/blog/update/${blog._id}`) }}>Edit</button>
                                <button className='lg:shadow-xl md:shadow-xl lg:text-[16px] md:text-[16px] text-[12px] text-white bg-[#6C5DD3] lg:px-8 md:px-8 px-3 lg:py-3 md:py-3 py-1 lg:font-medium md:font-medium font-medium rounded-xl' onClick={() => { blogDelete() }}>Delete</button>
                            </div>
                        }
                    </div>
                    <div className='flex md:flex-row flex-col w-full md:justify-normal justify-center'>
                        <div className="md:w-1/2 w-full flex justify-center items-center">
                            <img src={blog?.image || Blog} alt={blog?.title} className='h-[300px] object-cover' />
                        </div>
                        <div className="flex md:flex-col md:flex-nowrap flex-wrap flex-row md:items-start items-center gap-y-2 mt-6 md:mt-0 md:w-1/2 w-full text-sm justify-between">
                            <div className='flex flex-row gap-4'>
                                <span className='text-[#6C5DD3]'>Category :</span>
                                <span>{blog?.category?.charAt(0).toUpperCase() + blog?.category?.slice(1)}</span>
                            </div>
                            <div className="flex flex-row gap-4">
                                <span className='text-[#6C5DD3]'>Author :</span>
                                <span>{blog?.createdBy?.name}</span>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <span className='text-[#6C5DD3]'>Published on :</span>
                                <span>{moment(blog?.publishedAt).format('llll')}</span>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <span className='text-[#6C5DD3]'>Last updated :</span>
                                <span>{moment(blog?.updatedAt).format('llll')}</span>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <span className='text-[#6C5DD3]'>Tags :</span>
                                <div className='flex flex-row gap-2'>
                                    {blog?.tags?.map((tag, index) => (
                                        <div key={index} className='bg-[#6C5DD3] px-2 py-1 rounded-md text-white'>{tag}</div>
                                    ))}
                                </div>
                            </div>
                            {userId === blog?.createdBy?._id && <div className='flex flex-row gap-4'>
                                <button className={`lg:shadow-xl md:shadow-xl lg:text-[16px] md:text-[16px] text-[12px] text-white lg:px-6 md:px-6 px-3 lg:py-1 md:py-1 py-1 lg:font-medium md:font-medium font-medium rounded-lg ${blog?.status === 'published' ? 'cursor-not-allowed bg-[#6d5dd37b]' : 'cursor-pointer bg-[#6C5DD3]'}`}
                                    onClick={() => { publish() }}>
                                    {blog?.status === 'published' ? 'Published' : 'Publish'}
                                </button>
                            </div>}
                        </div>
                    </div>
                    <div className="flex border p-4 rounded-lg md:mb-0 mb-32">
                        {blog.content}
                    </div>
                </div>
            )}
        </PageWithNavbar>
    );
}

export default Home