import React, { useEffect, useState } from 'react'
import { Feild, PageWithNavbar } from '../../common/components'
import { setLoading } from '../../redux/loaderReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveNewBlog } from '../../common/apis/blogs';
import TextArea from 'antd/es/input/TextArea';
import { message, Select } from 'antd';
import { category } from '../../baseURL';

const NewBlog = () => {

    const [blog, setBlog] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(blog?.category || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const selectTag = (value) => {
        blog.tags = value;
        setSelectedTags(value);
    }

    const selectCategory = (value) => {
        blog.category = value;
        setSelectedCategory(value);
    }

    const saveBlog = async ({ publish }) => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setLoading(true));
            if (publish) {
                blog.status = 'published';
            } else {
                blog.status = 'draft';
            }
            const data = await saveNewBlog(blog);
            if (data?.success) {
                message.success(data.message || 'Blog updated successfully');
                navigate('/');
            }
            else {
                dispatch(setLoading(false));
                console.log(data);
            }
        } else {
            dispatch(setLoading(false));
            navigate('/login');
        }
        dispatch(setLoading(false));
    }

    useEffect(() => {
        if (blog?.tags) {
            setSelectedTags(blog?.tags);
        }
        if (blog?.category) {
            setSelectedCategory(blog?.category);
        }
    }, [blog?.tags, blog?.category]);


    return (
        <PageWithNavbar>
            {blog &&
                <div className="flex flex-col bg-[#FAFAFB] gap-12 md:px-16 lg:px-16 px-4 pt-8">
                    <div className="flex md:flex-row flex-col w-full justify-between">
                        <span className='md:text-xl'><span className="text-purple-700">Create a new Blog </span></span>
                    </div>
                    <div className="flex md:flex-row flex-col w-full justify-between">
                        <div className="flex flex-col w-full gap-y-4">
                            <Feild
                                label='Title'
                                value={blog.title}
                                placeholder='Enter title'
                                inputClassNames='w-full'
                                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                            />
                            <Feild
                                label='Description'
                                value={blog.description}
                                placeholder='Enter description'
                                inputClassNames='w-full'
                                onChange={(e) => setBlog({ ...blog, description: e.target.value })}
                            />
                            <div>
                                <div className='mb-2 flex items-center gap-2 text-sm font-medium text-gray-600 '>Content</div>
                                <TextArea
                                    label='Content'
                                    value={blog.content}
                                    placeholder='Enter content'
                                    inputClassNames='w-full'
                                    type='textarea'
                                    onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                                />
                            </div>
                            <div>
                                <div className='mb-2 flex items-center gap-2 text-sm font-medium text-gray-600 '>Category</div>
                                <Select
                                    value={selectedCategory}
                                    onChange={selectCategory}
                                    className='w-full'
                                >
                                    {category.map((tag, index) => (
                                        <Select.Option key={index} value={tag}>{tag}</Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <div className='mb-2 flex items-center gap-2 text-sm font-medium text-gray-600 '>Tags</div>
                                <Select
                                    mode='tags'
                                    value={selectedTags}
                                    onChange={selectTag}
                                    className='w-full'
                                >
                                    {blog.tags?.map((tag, index) => (
                                        <Select.Option key={index} value={tag}>{tag}</Select.Option>
                                    ))}
                                </Select>
                            </div>

                        </div>
                    </div>
                    <div className="flex justify-end gap-x-2 p-4 rounded-lg md:mb-0 mb-32">
                        <button
                            className='lg:shadow-xl md:shadow-xl lg:text-[14px] md:text-[14px] text-[12px] text-white bg-[#6C5DD3] lg:px-8 md:px-8 px-3 lg:py-1 md:py-3 py-1 lg:font-medium md:font-medium font-medium rounded-lg'
                            onClick={() => saveBlog({ publish: false })}
                        >
                            Save
                        </button>
                        <button
                            className='lg:shadow-xl md:shadow-xl lg:text-[14px] md:text-[14px] text-[12px] text-white bg-[#6C5DD3] lg:px-8 md:px-8 px-3 lg:py-1 md:py-3 py-1 lg:font-medium md:font-medium font-medium rounded-lg'
                            onClick={() => saveBlog({ publish: true })}
                        >
                            Save & Publish
                        </button>
                    </div>
                </div>}
        </PageWithNavbar>
    );
}

export default NewBlog