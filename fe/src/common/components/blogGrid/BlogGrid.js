import { MdOutlineCalendarMonth } from 'react-icons/md';
import { Tooltip } from 'antd'; // For the skeleton, you can use Ant Design or any skeleton loader package.
import moment from 'moment';
import { Blog } from '../../assets';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogGrid = ({ blogs }) => {
    const [columns, setColumns] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1024) {
                setColumns(4); // lg
            } else if (width >= 768) {
                setColumns(3); // md
            } else {
                setColumns(2); // sm
            }
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const totalBlogs = blogs.length;
    const totalSlots = Math.ceil(totalBlogs / columns) * columns;
    const skeletonCount = totalSlots - totalBlogs;

    return (
        <div className='gap-x-4 gap-y-2.5 px-4 pt-6 pb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:pl-16 md:gap-x-12 md:gap-y-8 md:pt-12 md:pr-16 md:pb-12'>
            {blogs.map(blog => (
                <div key={blog._id} className="shadow rounded-lg md:min-h-[23rem] cursor-pointer hover:bg-[#f0f0f0] duration-300" onClick={() => { navigate(`/blog/${blog._id}`) }}>
                    <div className='md:py-12 py-2 px-8 flex justify-center items-center'>
                        <img src={Blog} alt="" />
                    </div>
                    <div className="flex flex-col px-4 gap-y-2 h-[45%] py-4">
                        <span className='md:text-base text-[14px]'>
                            <Tooltip placement="top" title={blog.title}>
                                {blog.title.slice(0, 15)}...
                            </Tooltip>
                        </span>
                        <span className='flex justify-start items-start h-full'>
                            <span className='md:text-[13px] text-[12px] text-gray-400 font-normal line-clamp-4'>{blog.description}</span>
                        </span>
                        <span className='flex items-center gap-2 text-[10px] text-gray-400'>
                            <MdOutlineCalendarMonth />
                            {moment().diff(moment(blog.createdAt), 'days') < 30
                                ? moment(blog.createdAt).fromNow()
                                : moment(blog.createdAt).format('MMMM DD, YYYY')}
                        </span>
                    </div>
                </div>
            ))}

            {/* Render skeletons if the row isn't full */}
            {[...Array(skeletonCount)].map((_, index) => (
                <div key={index} className="border rounded-lg bg-gray-200">
                </div>
            ))}
        </div>
    );
};

export default BlogGrid;